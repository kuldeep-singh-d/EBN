import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'profile',
  initialState: {
    me: createRequestState(),
    billing: createRequestState(),
  },
  reducers: {
    meRequested: state => requestReducers.requested(state.me),
    meSuccess: (state, action) => requestReducers.success(state.me, action),
    meFailed: (state, action) => requestReducers.failed(state.me, action),
    billingRequested: state => requestReducers.requested(state.billing),
    billingSuccess: (state, action) =>
      requestReducers.success(state.billing, action),
    billingFailed: (state, action) =>
      requestReducers.failed(state.billing, action),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const getMyProfile = () =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.profile.me,
    onStart: actions.meRequested.type,
    onFailed: actions.meFailed.type,
    onSuccess: actions.meSuccess.type,
  });

export const getMyBillingDetails = () =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.profile.billing,
    onStart: actions.billingRequested.type,
    onFailed: actions.billingFailed.type,
    onSuccess: actions.billingSuccess.type,
  });
