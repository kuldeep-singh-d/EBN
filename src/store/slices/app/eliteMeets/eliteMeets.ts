import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'eliteMeets',
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
    listReset: state => requestReducers.reset(state.list),
    createRequested: state => requestReducers.requested(state.create),
    createSuccess: (state, action) =>
      requestReducers.success(state.create, action),
    createFailed: (state, action) =>
      requestReducers.failed(state.create, action),
    createReset: state => requestReducers.reset(state.create),
    detailRequested: state => requestReducers.requested(state.detail),
    detailSuccess: (state, action) =>
      requestReducers.success(state.detail, action),
    detailFailed: (state, action) =>
      requestReducers.failed(state.detail, action),
    detailReset: state => requestReducers.reset(state.detail),
    updateRequested: state => requestReducers.requested(state.update),
    updateSuccess: (state, action) =>
      requestReducers.success(state.update, action),
    updateFailed: (state, action) =>
      requestReducers.failed(state.update, action),
    updateReset: state => requestReducers.reset(state.update),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const listEliteMeets = (params = { status: 'Scheduled' }) =>
  apiCallBegan({
    params,
    method: methods.GET,
    url: apiRoutes.eliteMeets.list,
    onStart: actions.listRequested.type,
    onFailed: actions.listFailed.type,
    onSuccess: actions.listSuccess.type,
  });

export const createEliteMeet = (data: object) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.POST,
    url: apiRoutes.eliteMeets.create,
    onStart: actions.createRequested.type,
    onFailed: actions.createFailed.type,
    onSuccess: actions.createSuccess.type,
  });

export const showEliteMeet = (id: string | number) =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.eliteMeets.show(id),
    onStart: actions.detailRequested.type,
    onFailed: actions.detailFailed.type,
    onSuccess: actions.detailSuccess.type,
  });

export const updateEliteMeet = (id: string | number, data: object) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.PUT,
    url: apiRoutes.eliteMeets.update(id),
    onStart: actions.updateRequested.type,
    onFailed: actions.updateFailed.type,
    onSuccess: actions.updateSuccess.type,
  });
