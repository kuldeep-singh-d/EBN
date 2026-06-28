import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../createRequestSlice';

export type ForgotPasswordResponse = {
  status?: string;
  success?: boolean;
  message?: string;
};

const slice = createSlice({
  name: 'forgotPassword',
  initialState: createRequestState<ForgotPasswordResponse>(),
  reducers: {
    requested: requestReducers.requested,
    success: (
      state,
      action: PayloadAction<ForgotPasswordResponse | undefined>,
    ) => {
      state.data = action.payload || { success: true };
      state.loading = false;
      state.error = undefined;
    },
    failed: requestReducers.failed,
    reset: requestReducers.reset,
  },
});

export const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const forgotPassword = (email: string) =>
  apiCallBegan({
    params: { email },
    data: {},
    isRowData: true,
    method: methods.POST,
    url: apiRoutes.auth.forgotPassword,
    onStart: requested.type,
    onFailed: failed.type,
    onSuccess: success.type,
  });
