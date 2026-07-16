import { useEffect } from 'react';

import { useDispatch, useSelector } from '@hooks';
import {
  resetVisitorInvitationDetail,
  showVisitorInvitation,
} from '@store/slices/app/visitorInvitations/visitorInvitations';
import type { VisitorInvitationDetailResponse } from '../types';

const useVisitorDetail = (visitorId: number | null) => {
  const dispatch = useDispatch();

  const detailResponse = useSelector(
    state => state.visitorInvitations?.detail?.data,
  ) as VisitorInvitationDetailResponse | undefined;
  const loading = useSelector(state =>
    Boolean(state.visitorInvitations?.detail?.loading),
  );

  useEffect(() => {
    dispatch(resetVisitorInvitationDetail());

    if (visitorId) {
      dispatch(showVisitorInvitation(visitorId));
    }

    return () => {
      dispatch(resetVisitorInvitationDetail());
    };
  }, [dispatch, visitorId]);

  return {
    states: {
      detail: detailResponse?.data,
      loading,
    },
  };
};

export default useVisitorDetail;
