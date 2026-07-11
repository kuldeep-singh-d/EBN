import { useCallback, useMemo, useState } from 'react';
import {
  BookOpenText,
  Handshake,
  NotebookTabs,
  UsersRound,
} from 'lucide-react-native';

import useStyles from './styles';
import type { SlipRecord, SlipsData, SlipsTabKey, SlipType } from './types';

const FILTER_OPTIONS: SlipsData['filterOptions'] = [
  { key: 'tyfcb', label: 'TYFCB', icon: Handshake },
  { key: 'referral', label: 'Referral', icon: NotebookTabs },
  { key: 'ceu', label: 'CEU', icon: BookOpenText },
  { key: 'oneToOne', label: 'One-to-One', icon: UsersRound },
];

const MOCK_SLIPS: SlipRecord[] = [
  {
    id: 'given-1',
    tab: 'given',
    type: 'oneToOne',
    date: 'July 08 2026',
    title: 'Sunny Gurjar - July 03 2026',
    subtitle: 'One-to-One meeting',
  },
  {
    id: 'given-2',
    tab: 'given',
    type: 'oneToOne',
    date: 'July 06 2026',
    title: 'KUSHAL SHAH - July 04 2026',
    subtitle: 'One-to-One meeting',
  },
  {
    id: 'given-3',
    tab: 'given',
    type: 'referral',
    date: 'June 03 2026',
    title: 'Ritik Patidar',
    subtitle: 'Referral shared',
    isHighlighted: true,
  },
  {
    id: 'given-4',
    tab: 'given',
    type: 'tyfcb',
    date: 'May 27 2026',
    title: 'Prashant Shah',
    subtitle: 'Thank you for closed business',
    amount: '₹16000',
  },
  {
    id: 'given-5',
    tab: 'given',
    type: 'ceu',
    date: 'May 21 2026',
    title: 'Chapter Learning Session',
    subtitle: 'CEU submitted',
  },
  {
    id: 'received-1',
    tab: 'received',
    type: 'referral',
    date: 'May 27 2026',
    title: 'Prashant Shah',
    subtitle: 'Prashant Shah',
    isHighlighted: true,
  },
  {
    id: 'received-2',
    tab: 'received',
    type: 'referral',
    date: 'May 20 2026',
    title: 'Prashant Shah',
    subtitle: 'Prashant Shah',
    isHighlighted: true,
  },
  {
    id: 'received-3',
    tab: 'received',
    type: 'referral',
    date: 'May 13 2026',
    title: 'Jigish Shah',
    subtitle: 'Anil Rathi Amanta Kheda',
  },
  {
    id: 'received-4',
    tab: 'received',
    type: 'tyfcb',
    date: 'April 23 2026',
    title: 'VIVEK PARIKH',
    subtitle: 'Business closed',
    amount: '₹4130',
  },
];

const SLIPS_DATA: SlipsData = {
  title: 'Activity Feed',
  tabs: [
    { key: 'given', label: 'Given' },
    { key: 'received', label: 'Received' },
  ],
  filterOptions: FILTER_OPTIONS,
  slips: MOCK_SLIPS,
};

const useSlips = () => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<SlipsTabKey>('given');
  const [selectedFilter, setSelectedFilter] = useState<SlipType | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const filteredSlips = useMemo(
    () =>
      SLIPS_DATA.slips.filter(
        slip =>
          slip.tab === activeTab &&
          (!selectedFilter || slip.type === selectedFilter),
      ),
    [activeTab, selectedFilter],
  );

  const activeFilterLabel = useMemo(
    () =>
      selectedFilter
        ? SLIPS_DATA.filterOptions.find(option => option.key === selectedFilter)
            ?.label
        : undefined,
    [selectedFilter],
  );

  const setActiveSlipTab = useCallback((tab: SlipsTabKey) => {
    setActiveTab(tab);
    setIsFilterVisible(false);
  }, []);

  const toggleFilter = useCallback(() => {
    setIsFilterVisible(current => !current);
  }, []);

  const setFilter = useCallback((filter: SlipType | null) => {
    setSelectedFilter(filter);
    setIsFilterVisible(false);
  }, []);

  const onAddPress = useCallback(() => {
    console.log('[Slips] add slip');
  }, []);

  const onSlipPress = useCallback((slipId: string) => {
    console.log('[Slips] open slip', slipId);
  }, []);

  return {
    styles,
    states: {
      activeFilterLabel,
      activeTab,
      filteredSlips,
      isFilterVisible,
      screenData: SLIPS_DATA,
      selectedFilter,
    },
    handlers: {
      onAddPress,
      onSlipPress,
      setActiveSlipTab,
      setFilter,
      toggleFilter,
    },
    constants: {},
  };
};

export default useSlips;
