import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDispatch, useSelector } from '@hooks';
import {
  resetEliteMemberDetail,
  resetEliteMemberSearch,
  searchEliteMembers,
  showEliteMember,
} from '@store/slices/app/eliteMembers/eliteMembers';
import useStyles from './styles';
import type {
  MemberApiRecord,
  MemberProfile,
  MembersDetailResponse,
  MemberSearchCriteria,
  MembersData,
  MembersSearchResponse,
  MembersTabKey,
} from './types';

type ListRequestMode = 'initial' | 'refresh' | 'next';
type MembersRequestContext = 'chapter' | 'global';
type MembersApiTab = MembersRequestContext;

const INITIAL_CRITERIA: MemberSearchCriteria = {
  search: '',
  company_name: '',
  brand_name: '',
  nature_of_business: '',
};

const MEMBERS_DATA: MembersData = {
  title: 'Search Member',
  tabs: [
    { key: 'chapterRoster', label: 'CHAPTER MEMBER' },
    { key: 'otherMember', label: 'GLOBAL SEARCH' },
  ],
};

const MEMBERS_API_TAB_BY_CONTEXT: Record<MembersRequestContext, MembersApiTab> =
  {
    chapter: 'chapter',
    global: 'global',
  };

const getMemberCompany = (member: MemberApiRecord) =>
  member.member_profile?.company_name ||
  member.member_profile?.brand_name ||
  'Company not available';

const getMemberSpecialty = (member: MemberApiRecord) =>
  member.sub_category?.name ||
  member.category?.name ||
  member.member_profile?.nature_of_business ||
  'Speciality not available';

const mapMember = (member: MemberApiRecord): MemberProfile => ({
  id: member.id,
  name: member.name || '-',
  email: member.email || undefined,
  phone: member.phone || undefined,
  status: member.status || undefined,
  company: getMemberCompany(member),
  specialty: getMemberSpecialty(member),
  avatar: member.member_profile?.avatar || null,
  chapterName: member.primary_chapter?.name,
  chapterCity: member.primary_chapter?.city || undefined,
});

const getNextPage = (hasNextPage?: string | null, currentPage = 1) =>
  hasNextPage ? currentPage + 1 : null;

const mergePageMembers = (
  current: MemberProfile[],
  nextItems: MemberProfile[],
  page: number,
  mode: ListRequestMode,
) => {
  if (page <= 1 || mode !== 'next') {
    return nextItems;
  }

  const existingIds = new Set(current.map(member => member.id));
  const uniqueItems = nextItems.filter(member => !existingIds.has(member.id));

  return [...current, ...uniqueItems];
};

const useMembers = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<MembersTabKey>('chapterRoster');
  const [rosterQuery, setRosterQuery] = useState('');
  const [criteria, setCriteria] =
    useState<MemberSearchCriteria>(INITIAL_CRITERIA);
  const [chapterMembers, setChapterMembers] = useState<MemberProfile[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [requestMode, setRequestMode] = useState<ListRequestMode>('initial');
  const [requestContext, setRequestContext] =
    useState<MembersRequestContext>('chapter');
  const [globalMembers, setGlobalMembers] = useState<MemberProfile[]>([]);
  const [globalNextPage, setGlobalNextPage] = useState<number | null>(null);
  const [globalRequestMode, setGlobalRequestMode] =
    useState<ListRequestMode>('initial');
  const [isGlobalResultView, setIsGlobalResultView] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [detailSource, setDetailSource] =
    useState<MembersRequestContext>('chapter');
  const requestContextRef = useRef<MembersRequestContext>('chapter');
  const requestModeRef = useRef<ListRequestMode>('initial');
  const globalRequestModeRef = useRef<ListRequestMode>('initial');

  const searchResponse = useSelector(
    state => state.eliteMembers?.search?.data,
  ) as MembersSearchResponse | undefined;
  const searchLoading = useSelector(state =>
    Boolean(state.eliteMembers?.search?.loading),
  );
  const detailResponse = useSelector(
    state => state.eliteMembers?.detail?.data,
  ) as MembersDetailResponse | undefined;
  const detailLoading = useSelector(state =>
    Boolean(state.eliteMembers?.detail?.loading),
  );

  const fetchChapterMembers = useCallback(
    (page = 1, mode: ListRequestMode = 'refresh') => {
      requestContextRef.current = 'chapter';
      requestModeRef.current = mode;
      setRequestContext('chapter');
      setRequestMode(mode);
      dispatch(
        searchEliteMembers({
          tab: MEMBERS_API_TAB_BY_CONTEXT.chapter,
          page,
        }),
      );
    },
    [dispatch],
  );

  const refreshChapterMembers = useCallback(() => {
    fetchChapterMembers(1, 'refresh');
  }, [fetchChapterMembers]);

  const fetchNextChapterMembers = useCallback(() => {
    if (searchLoading || !nextPage) return;
    fetchChapterMembers(nextPage, 'next');
  }, [fetchChapterMembers, nextPage, searchLoading]);

  const getGlobalSearchParams = useCallback(
    (page = 1) => {
      const normalizeValue = (value: string) => value.trim();

      return {
        tab: MEMBERS_API_TAB_BY_CONTEXT.global,
        page,
        search: normalizeValue(criteria.search),
        company_name: normalizeValue(criteria.company_name),
        brand_name: normalizeValue(criteria.brand_name),
        nature_of_business: normalizeValue(criteria.nature_of_business),
      };
    },
    [criteria],
  );

  const fetchGlobalMembers = useCallback(
    (page = 1, mode: ListRequestMode = 'refresh') => {
      requestContextRef.current = 'global';
      globalRequestModeRef.current = mode;
      setRequestContext('global');
      setGlobalRequestMode(mode);
      dispatch(searchEliteMembers(getGlobalSearchParams(page)));
    },
    [dispatch, getGlobalSearchParams],
  );

  const refreshGlobalMembers = useCallback(() => {
    fetchGlobalMembers(1, 'refresh');
  }, [fetchGlobalMembers]);

  const fetchNextGlobalMembers = useCallback(() => {
    if (searchLoading || !globalNextPage) return;
    fetchGlobalMembers(globalNextPage, 'next');
  }, [fetchGlobalMembers, globalNextPage, searchLoading]);

  useEffect(() => {
    dispatch(resetEliteMemberSearch());
    fetchChapterMembers(1, 'initial');

    return () => {
      dispatch(resetEliteMemberSearch());
      dispatch(resetEliteMemberDetail());
    };
  }, [dispatch, fetchChapterMembers]);

  useEffect(() => {
    const pagination = searchResponse?.data;
    if (!pagination) return;

    const page = pagination.current_page ?? 1;
    const pageItems = (pagination.data ?? []).map(mapMember);
    const nextPageValue = getNextPage(pagination.next_page_url, page);

    if (requestContextRef.current === 'global') {
      setGlobalNextPage(nextPageValue);
      setGlobalMembers(current =>
        mergePageMembers(
          current,
          pageItems,
          page,
          globalRequestModeRef.current,
        ),
      );
      return;
    }

    setNextPage(nextPageValue);
    setChapterMembers(current =>
      mergePageMembers(current, pageItems, page, requestModeRef.current),
    );
  }, [searchResponse]);

  const filteredMembers = useMemo(() => {
    const query = rosterQuery.trim().toLowerCase();

    if (!query) {
      return chapterMembers;
    }

    return chapterMembers.filter(member =>
      [
        member.name,
        member.company,
        member.specialty,
        member.email,
        member.phone,
        member.chapterName,
      ].some(value => value?.toLowerCase().includes(query)),
    );
  }, [chapterMembers, rosterQuery]);

  const canSearch = useMemo(
    () => Object.values(criteria).some(value => value.trim().length >= 2),
    [criteria],
  );

  const canClear = useMemo(
    () => Object.values(criteria).some(value => value.length > 0),
    [criteria],
  );

  const setCriteriaValue = useCallback(
    (key: keyof MemberSearchCriteria, value: string) => {
      setCriteria(current => ({
        ...current,
        [key]: value,
      }));
    },
    [],
  );

  const resetCriteria = useCallback(() => {
    setCriteria({ ...INITIAL_CRITERIA });
  }, []);

  const setActiveMembersTab = useCallback((tab: MembersTabKey) => {
    setActiveTab(tab);
    setIsGlobalResultView(false);
    setSelectedMemberId(null);
    setDetailSource('chapter');
  }, []);

  const onMemberPress = useCallback(
    (memberId: number) => {
      setSelectedMemberId(memberId);
      setDetailSource(isGlobalResultView ? 'global' : 'chapter');
      dispatch(resetEliteMemberDetail());
      dispatch(showEliteMember(memberId));
    },
    [dispatch, isGlobalResultView],
  );

  const onSearchPress = useCallback(() => {
    if (!canSearch) {
      return;
    }

    setGlobalMembers([]);
    setGlobalNextPage(null);
    setIsGlobalResultView(true);
    fetchGlobalMembers(1, 'initial');
  }, [canSearch, fetchGlobalMembers]);

  const onBackToGlobalSearch = useCallback(() => {
    setIsGlobalResultView(false);
  }, []);

  const onBackToMemberList = useCallback(() => {
    setSelectedMemberId(null);
    setDetailSource('chapter');
    dispatch(resetEliteMemberDetail());
  }, [dispatch]);

  const onHeaderBackPress = useCallback(() => {
    if (selectedMemberId) {
      onBackToMemberList();
      return;
    }

    onBackToGlobalSearch();
  }, [onBackToGlobalSearch, onBackToMemberList, selectedMemberId]);

  const isChapterRequest = requestContext === 'chapter';
  const isGlobalRequest = requestContext === 'global';

  return {
    styles,
    states: {
      activeTab,
      canClear,
      canSearch,
      criteria,
      filteredMembers,
      globalHasNextPage: Boolean(globalNextPage),
      globalMembers,
      hasNextPage: Boolean(nextPage),
      isDetailLoading: detailLoading,
      isDetailView: Boolean(selectedMemberId),
      isFetchingNextPage:
        isChapterRequest && searchLoading && requestMode === 'next',
      isGlobalFetchingNextPage:
        isGlobalRequest && searchLoading && globalRequestMode === 'next',
      isGlobalInitialLoading:
        isGlobalRequest &&
        searchLoading &&
        globalRequestMode === 'initial' &&
        !globalMembers.length,
      isGlobalRefreshing:
        isGlobalRequest && searchLoading && globalRequestMode === 'refresh',
      isGlobalResultView,
      isInitialLoading:
        isChapterRequest &&
        searchLoading &&
        requestMode === 'initial' &&
        !chapterMembers.length,
      isRefreshing:
        isChapterRequest && searchLoading && requestMode === 'refresh',
      rosterQuery,
      screenData: MEMBERS_DATA,
      selectedMember: detailResponse?.data,
      showChapterInformationInDetail: detailSource === 'global',
      searchLoading,
    },
    handlers: {
      fetchNextChapterMembers,
      fetchNextGlobalMembers,
      onBackToMemberList,
      onBackToGlobalSearch,
      onHeaderBackPress,
      onMemberPress,
      onSearchPress,
      refreshChapterMembers,
      refreshGlobalMembers,
      resetCriteria,
      setActiveTab: setActiveMembersTab,
      setCriteriaValue,
      setRosterQuery,
    },
    constants: {},
  };
};

export default useMembers;
