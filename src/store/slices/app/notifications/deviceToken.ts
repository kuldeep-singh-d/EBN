import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'deviceToken',
  initialState: createRequestState(),
  reducers: requestReducers,
});

export const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const saveDeviceToken = (data: { device_token: string }) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.POST,
    url: apiRoutes.notifications.saveDeviceToken,
    onStart: requested.type,
    onFailed: failed.type,
    onSuccess: success.type,
  });
