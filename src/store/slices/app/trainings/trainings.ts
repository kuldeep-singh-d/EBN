import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'trainings',
  initialState: {
    list: createRequestState(),
    register: createRequestState(),
    cancelRegistration: createRequestState(),
  },
  reducers: {
    listRequested: state => requestReducers.requested(state.list),
    listSuccess: (state, action) => requestReducers.success(state.list, action),
    listFailed: (state, action) => requestReducers.failed(state.list, action),
    registerRequested: state => requestReducers.requested(state.register),
    registerSuccess: (state, action) =>
      requestReducers.success(state.register, action),
    registerFailed: (state, action) =>
      requestReducers.failed(state.register, action),
    cancelRegistrationRequested: state =>
      requestReducers.requested(state.cancelRegistration),
    cancelRegistrationSuccess: (state, action) =>
      requestReducers.success(state.cancelRegistration, action),
    cancelRegistrationFailed: (state, action) =>
      requestReducers.failed(state.cancelRegistration, action),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const listTrainings = (params?: object) =>
  apiCallBegan({
    params,
    method: methods.GET,
    url: apiRoutes.trainings.list,
    onStart: actions.listRequested.type,
    onFailed: actions.listFailed.type,
    onSuccess: actions.listSuccess.type,
  });

export const registerForTraining = (id: string | number) =>
  apiCallBegan({
    method: methods.POST,
    url: apiRoutes.trainings.register(id),
    onStart: actions.registerRequested.type,
    onFailed: actions.registerFailed.type,
    onSuccess: actions.registerSuccess.type,
  });

export const cancelTrainingRegistration = (id: string | number) =>
  apiCallBegan({
    method: methods.DELETE,
    url: apiRoutes.trainings.cancelRegistration(id),
    onStart: actions.cancelRegistrationRequested.type,
    onFailed: actions.cancelRegistrationFailed.type,
    onSuccess: actions.cancelRegistrationSuccess.type,
  });
