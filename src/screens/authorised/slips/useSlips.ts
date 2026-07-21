import { useCallback, useEffect, useMemo, useState } from 'react';
import { BadgeIndianRupee, Handshake, NotebookTabs } from 'lucide-react-native';

import { useDispatch, useSelector } from '@hooks';
import {
  listEliteActivities,
  resetEliteActivitiesList,
} from '@store/slices/app/eliteActivities/eliteActivities';
import useStyles from './styles';
import type {
  EliteActivitiesListResponse,
  EliteActivityItem,
  SlipFormType,
  SlipRecord,
  SlipsData,
  SlipsTabKey,
  SlipType,
} from './types';

type ListRequestMode = 'initial' | 'refresh' | 'next';

const FILTER_OPTIONS: SlipsData['filterOptions'] = [
  { key: 'meet', label: 'Meet', icon: Handshake },
  { key: 'elite', label: 'Elite', icon: BadgeIndianRupee },
  { key: 'referral', label: 'Referral', icon: NotebookTabs },
];

const SLIPS_DATA: SlipsData = {
  title: 'Activity Feed',
  tabs: [
    { key: 'given', label: 'Given' },
    { key: 'received', label: 'Received' },
  ],
  filterOptions: FILTER_OPTIONS,
  slips: [],
};

const getStringValue = (
  data: EliteActivityItem['data'],
  keys: string[],
): string | undefined => {
  const value = keys
    .map(key => data?.[key])
    .find(item => typeof item === 'string' && item.trim());

  return typeof value === 'string' ? value : undefined;
};

const getAmountValue = (data: EliteActivityItem['data']) => {
  const value = ['amount', 'total_amount', 'business_amount', 'value']
    .map(key => data?.[key])
    .find(item => typeof item === 'string' || typeof item === 'number');

  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  return String(value).startsWith('₹') ? String(value) : `₹${value}`;
};

const getSlipType = (type?: string): SlipType => {
  if (type === 'meet' || type === 'elite' || type === 'referral') {
    return type;
  }

  return 'elite';
};

const getSlipTitle = (activity: EliteActivityItem) => {
  const data = activity.data;
  const type = getSlipType(activity.type);

  return (
    getStringValue(data, [
      'with_member_name',
      'to_member_name',
      'from_member_name',
      'member_name',
      'referral_name',
      'name',
      'title',
      'business_name',
    ]) ??
    FILTER_OPTIONS.find(option => option.key === type)?.label ??
    'Slip'
  );
};

const getSlipSubtitle = (activity: EliteActivityItem) => {
  const data = activity.data;
  const details = [
    getStringValue(data, ['status_label', 'status']),
    getStringValue(data, ['chapter_name']),
    getStringValue(data, ['mode']),
    getStringValue(data, ['location']),
    getStringValue(data, ['time']),
    getStringValue(data, [
      'topics_discussed',
      'description',
      'referral_details',
      'business_details',
    ]),
  ].filter(Boolean);

  return details.length ? details.join(' - ') : 'Activity submitted';
};

const mapActivityToSlip = (
  activity: EliteActivityItem,
  tab: SlipsTabKey,
  index: number,
): SlipRecord => {
  const data = activity.data;
  const type = getSlipType(activity.type);
  const apiId = data?.id ?? `${activity.sort_date ?? 'activity'}-${index}`;

  return {
    id: `${tab}-${type}-${apiId}`,
    tab,
    type,
    raw: activity,
    date: activity.sort_date ?? getStringValue(data, ['date']) ?? '-',
    title: getSlipTitle(activity),
    subtitle: getSlipSubtitle(activity),
    amount: getAmountValue(data),
    isHighlighted: type === 'referral',
  };
};

const useSlips = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<SlipsTabKey>('given');
  const [selectedFilter, setSelectedFilter] = useState<SlipType | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isAddMenuVisible, setIsAddMenuVisible] = useState(false);
  const [activeForm, setActiveForm] = useState<SlipFormType | null>(null);
  const [slips, setSlips] = useState<SlipRecord[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [requestMode, setRequestMode] = useState<ListRequestMode>('initial');

  const activitiesResponse = useSelector(
    state => state.eliteActivities?.list?.data,
  ) as EliteActivitiesListResponse | undefined;
  const activitiesLoading = useSelector(state =>
    Boolean(state.eliteActivities?.list?.loading),
  );

  const fetchSlips = useCallback(
    (
      page = 1,
      mode: ListRequestMode = 'refresh',
      tab = activeTab,
      type = selectedFilter,
    ) => {
      setRequestMode(mode);
      dispatch(
        listEliteActivities({
          tab,
          page,
          ...(type ? { type } : {}),
        }),
      );
    },
    [activeTab, dispatch, selectedFilter],
  );

  const refreshSlips = useCallback(() => {
    fetchSlips(1, 'refresh');
  }, [fetchSlips]);

  const fetchNextSlips = useCallback(() => {
    if (activitiesLoading || !nextPage) return;
    fetchSlips(nextPage, 'next');
  }, [activitiesLoading, fetchSlips, nextPage]);

  useEffect(() => {
    dispatch(resetEliteActivitiesList());
    fetchSlips(1, 'initial');

    return () => {
      dispatch(resetEliteActivitiesList());
    };
  }, [dispatch, fetchSlips]);

  useEffect(() => {
    const pagination = activitiesResponse?.data;
    if (!pagination) return;

    const pageUrl = pagination.current_page_url;
    if (pageUrl) {
      const hasCurrentTab = pageUrl.includes(`tab=${activeTab}`);
      const hasCurrentType = selectedFilter
        ? pageUrl.includes(`type=${selectedFilter}`)
        : !pageUrl.includes('type=');

      if (!hasCurrentTab || !hasCurrentType) {
        return;
      }
    }

    const page = pagination.current_page ?? 1;
    const pageItems = (pagination.data ?? []).map((activity, index) =>
      mapActivityToSlip(activity, activeTab, index),
    );

    setNextPage(pagination.next_page_url ? page + 1 : null);
    setSlips(current => {
      if (page <= 1 || requestMode !== 'next') {
        return pageItems;
      }

      const existingIds = new Set(current.map(slip => slip.id));
      const nextItems = pageItems.filter(slip => !existingIds.has(slip.id));

      return [...current, ...nextItems];
    });
  }, [activeTab, activitiesResponse, requestMode, selectedFilter]);

  const activeFilterLabel = useMemo(
    () =>
      selectedFilter
        ? SLIPS_DATA.filterOptions.find(option => option.key === selectedFilter)
            ?.label
        : undefined,
    [selectedFilter],
  );

  const setActiveSlipTab = useCallback(
    (tab: SlipsTabKey) => {
      if (tab === activeTab) return;

      setActiveTab(tab);
      setIsFilterVisible(false);
      setIsAddMenuVisible(false);
      setSlips([]);
    },
    [activeTab],
  );

  const toggleFilter = useCallback(() => {
    setIsFilterVisible(current => !current);
    setIsAddMenuVisible(false);
  }, []);

  const setFilter = useCallback((filter: SlipType | null) => {
    setSelectedFilter(filter);
    setIsFilterVisible(false);
    setSlips([]);
  }, []);

  const onAddPress = useCallback(() => {
    setIsAddMenuVisible(current => !current);
    setIsFilterVisible(false);
  }, []);

  const onSlipPress = useCallback((slipId: string) => {
    console.log('[Slips] open slip', slipId);
  }, []);

  const onAddOptionPress = useCallback((type: SlipFormType) => {
    setActiveForm(type);
    setIsAddMenuVisible(false);
  }, []);

  const onBackToList = useCallback(() => {
    setActiveForm(null);
  }, []);

  return {
    styles,
    states: {
      activeFilterLabel,
      activeForm,
      activeTab,
      addOptions: FILTER_OPTIONS,
      filteredSlips: slips,
      hasNextPage: Boolean(nextPage),
      isAddMenuVisible,
      isFetchingNextPage: activitiesLoading && requestMode === 'next',
      isFilterVisible,
      isInitialLoading:
        activitiesLoading && requestMode === 'initial' && !slips.length,
      isRefreshing: activitiesLoading && requestMode === 'refresh',
      loading: activitiesLoading,
      screenData: SLIPS_DATA,
      selectedFilter,
    },
    handlers: {
      fetchNextSlips,
      onAddOptionPress,
      onAddPress,
      onBackToList,
      onSlipPress,
      refreshSlips,
      setActiveSlipTab,
      setFilter,
      toggleFilter,
    },
    constants: {},
  };
};

export default useSlips;
