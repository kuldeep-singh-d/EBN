import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'dashboard',
  initialState: createRequestState(),
  reducers: requestReducers,
});

export const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const getDashboardData = (params = { time_filter: 'lifetime' }) =>
  apiCallBegan({
    params,
    method: methods.GET,
    url: apiRoutes.dashboard.get,
    onStart: requested.type,
    onFailed: failed.type,
    onSuccess: success.type,
  });
