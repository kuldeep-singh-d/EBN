import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'profile',
  initialState: {
    me: createRequestState(),
    update: createRequestState(),
    billing: createRequestState(),
  },
  reducers: {
    meRequested: state => requestReducers.requested(state.me),
    meSuccess: (state, action) => requestReducers.success(state.me, action),
    meFailed: (state, action) => requestReducers.failed(state.me, action),
    updateRequested: state => requestReducers.requested(state.update),
    updateSuccess: (state, action) =>
      requestReducers.success(state.update, action),
    updateFailed: (state, action) =>
      requestReducers.failed(state.update, action),
    updateReset: state => requestReducers.reset(state.update),
    billingRequested: state => requestReducers.requested(state.billing),
    billingSuccess: (state, action) =>
      requestReducers.success(state.billing, action),
    billingFailed: (state, action) =>
      requestReducers.failed(state.billing, action),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const resetProfileUpdate = () => ({
  type: actions.updateReset.type,
});

export const getMyProfile = () =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.profile.me,
    onStart: actions.meRequested.type,
    onFailed: actions.meFailed.type,
    onSuccess: actions.meSuccess.type,
  });

export const updateMyProfile = (data: object) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.PATCH,
    url: apiRoutes.profile.update,
    onStart: actions.updateRequested.type,
    onFailed: actions.updateFailed.type,
    onSuccess: actions.updateSuccess.type,
  });

export const getMyBillingDetails = () =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.profile.billing,
    onStart: actions.billingRequested.type,
    onFailed: actions.billingFailed.type,
    onSuccess: actions.billingSuccess.type,
  });
