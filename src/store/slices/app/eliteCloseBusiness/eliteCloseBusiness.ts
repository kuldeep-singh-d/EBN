import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'eliteCloseBusiness',
  initialState: {
    availableReferrals: createRequestState(),
    list: createRequestState(),
    create: createRequestState(),
    detail: createRequestState(),
    update: createRequestState(),
  },
  reducers: {
    availableReferralsRequested: state =>
      requestReducers.requested(state.availableReferrals),
    availableReferralsSuccess: (state, action) =>
      requestReducers.success(state.availableReferrals, action),
    availableReferralsFailed: (state, action) =>
      requestReducers.failed(state.availableReferrals, action),
    listRequested: state => requestReducers.requested(state.list),
    listSuccess: (state, action) => requestReducers.success(state.list, action),
    listFailed: (state, action) => requestReducers.failed(state.list, action),
    createRequested: state => requestReducers.requested(state.create),
    createSuccess: (state, action) =>
      requestReducers.success(state.create, action),
    createFailed: (state, action) =>
      requestReducers.failed(state.create, action),
    detailRequested: state => requestReducers.requested(state.detail),
    detailSuccess: (state, action) =>
      requestReducers.success(state.detail, action),
    detailFailed: (state, action) =>
      requestReducers.failed(state.detail, action),
    updateRequested: state => requestReducers.requested(state.update),
    updateSuccess: (state, action) =>
      requestReducers.success(state.update, action),
    updateFailed: (state, action) =>
      requestReducers.failed(state.update, action),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const getAvailableReferrals = () =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.eliteCloseBusiness.availableReferrals,
    onStart: actions.availableReferralsRequested.type,
    onFailed: actions.availableReferralsFailed.type,
    onSuccess: actions.availableReferralsSuccess.type,
  });

export const listEliteCloseBusiness = (params = { tab: 'received' }) =>
  apiCallBegan({
    params,
    method: methods.GET,
    url: apiRoutes.eliteCloseBusiness.list,
    onStart: actions.listRequested.type,
    onFailed: actions.listFailed.type,
    onSuccess: actions.listSuccess.type,
  });

export const createEliteCloseBusiness = (data: object) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.POST,
    url: apiRoutes.eliteCloseBusiness.create,
    onStart: actions.createRequested.type,
    onFailed: actions.createFailed.type,
    onSuccess: actions.createSuccess.type,
  });

export const showEliteCloseBusiness = (id: string | number) =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.eliteCloseBusiness.show(id),
    onStart: actions.detailRequested.type,
    onFailed: actions.detailFailed.type,
    onSuccess: actions.detailSuccess.type,
  });

export const updateEliteCloseBusiness = (id: string | number, data: object) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.PUT,
    url: apiRoutes.eliteCloseBusiness.update(id),
    onStart: actions.updateRequested.type,
    onFailed: actions.updateFailed.type,
    onSuccess: actions.updateSuccess.type,
  });
