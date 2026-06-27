import { PayloadAction } from '@reduxjs/toolkit';

export type ApiError = unknown;

export type RequestState<T = unknown> = {
  data?: T;
  loading: boolean;
  error?: ApiError;
};

export const createRequestState = <T = unknown>(): RequestState<T> => ({
  data: undefined,
  loading: false,
  error: undefined,
});

export const requestReducers = {
  requested: (state: RequestState) => {
    state.loading = true;
    state.error = undefined;
  },
  success: (state: RequestState, action: PayloadAction<unknown>) => {
    state.data = action.payload;
    state.loading = false;
    state.error = undefined;
  },
  failed: (state: RequestState, action: PayloadAction<unknown>) => {
    state.loading = false;
    state.error = action.payload;
  },
  reset: (state: RequestState) => {
    state.data = undefined;
    state.loading = false;
    state.error = undefined;
  },
};
