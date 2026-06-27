import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'eliteReferrals',
  initialState: {
    list: createRequestState(),
    create: createRequestState(),
    detail: createRequestState(),
    update: createRequestState(),
  },
  reducers: {
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

export const listReferrals = (params = { tab: 'given' }) =>
  apiCallBegan({
    params,
    method: methods.GET,
    url: apiRoutes.eliteReferrals.list,
    onStart: actions.listRequested.type,
    onFailed: actions.listFailed.type,
    onSuccess: actions.listSuccess.type,
  });

export const createReferral = (data: object) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.POST,
    url: apiRoutes.eliteReferrals.create,
    onStart: actions.createRequested.type,
    onFailed: actions.createFailed.type,
    onSuccess: actions.createSuccess.type,
  });

export const showReferral = (id: string | number) =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.eliteReferrals.show(id),
    onStart: actions.detailRequested.type,
    onFailed: actions.detailFailed.type,
    onSuccess: actions.detailSuccess.type,
  });

export const updateReferral = (id: string | number, data: object) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.PUT,
    url: apiRoutes.eliteReferrals.update(id),
    onStart: actions.updateRequested.type,
    onFailed: actions.updateFailed.type,
    onSuccess: actions.updateSuccess.type,
  });
