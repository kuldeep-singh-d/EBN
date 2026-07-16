import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from '@hooks';
import {
  listVisitorInvitations,
  resetVisitorInvitationsList,
} from '@store/slices/app/visitorInvitations/visitorInvitations';
import type {
  VisitorInvitation,
  VisitorInvitationsListResponse,
} from '../types';

type ListRequestMode = 'initial' | 'refresh' | 'next';

const useVisitorList = () => {
  const dispatch = useDispatch();
  const [visitors, setVisitors] = useState<VisitorInvitation[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [requestMode, setRequestMode] = useState<ListRequestMode>('initial');

  const listResponse = useSelector(
    state => state.visitorInvitations?.list?.data,
  ) as VisitorInvitationsListResponse | undefined;
  const loading = useSelector(state =>
    Boolean(state.visitorInvitations?.list?.loading),
  );

  const fetchVisitors = useCallback(
    (page = 1, mode: ListRequestMode = 'refresh') => {
      setRequestMode(mode);
      dispatch(listVisitorInvitations({ page }));
    },
    [dispatch],
  );

  const refreshVisitors = useCallback(() => {
    fetchVisitors(1, 'refresh');
  }, [fetchVisitors]);

  const fetchNextVisitors = useCallback(() => {
    if (loading || !nextPage) return;
    fetchVisitors(nextPage, 'next');
  }, [fetchVisitors, loading, nextPage]);

  useEffect(() => {
    const pagination = listResponse?.data;
    if (!pagination) return;

    const page = pagination.current_page ?? 1;
    const pageItems = pagination.data ?? [];

    setNextPage(pagination.next_page_url ? page + 1 : null);
    setVisitors(current => {
      if (page <= 1 || requestMode !== 'next') {
        return pageItems;
      }

      const existingIds = new Set(current.map(visitor => visitor.id));
      const nextItems = pageItems.filter(
        visitor => !existingIds.has(visitor.id),
      );

      return [...current, ...nextItems];
    });
  }, [listResponse, requestMode]);

  useEffect(() => {
    dispatch(resetVisitorInvitationsList());
    fetchVisitors(1, 'initial');

    return () => {
      dispatch(resetVisitorInvitationsList());
    };
  }, [dispatch, fetchVisitors]);

  return {
    states: {
      hasNextPage: Boolean(nextPage),
      isFetchingNextPage: loading && requestMode === 'next',
      isInitialLoading:
        loading && requestMode === 'initial' && !visitors.length,
      isRefreshing: loading && requestMode === 'refresh',
      loading,
      visitors,
    },
    handlers: {
      fetchNextVisitors,
      refreshVisitors,
    },
  };
};

export default useVisitorList;
