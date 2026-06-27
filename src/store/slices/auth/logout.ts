import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../createRequestSlice';

const slice = createSlice({
  name: 'logout',
  initialState: createRequestState(),
  reducers: requestReducers,
});

export const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const logout = () =>
  apiCallBegan({
    method: methods.POST,
    url: apiRoutes.auth.logout,
    onStart: requested.type,
    onFailed: failed.type,
    onSuccess: success.type,
  });
