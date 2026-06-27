import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../createRequestSlice';

export type LoginPayload = {
  email: string;
  password: string;
  device_name: string;
};

export type LoginUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  chapter: string | null;
};

export type LoginResponse = {
  status?: string;
  success?: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: LoginUser;
  };
};

const slice = createSlice({
  name: 'login',
  initialState: createRequestState<LoginResponse>(),
  reducers: requestReducers,
});

export const { requested, success, failed, reset } = slice.actions;
export default slice.reducer;

export const login = (data: LoginPayload) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.POST,
    url: apiRoutes.auth.login,
    onStart: requested.type,
    onFailed: failed.type,
    onSuccess: success.type,
  });
