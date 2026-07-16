import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const ensureRequestState = (state: any, key: string) => {
  if (!state[key]) {
    state[key] = createRequestState();
  }

  return state[key];
};

const slice = createSlice({
  name: 'payments',
  initialState: {
    invoices: createRequestState(),
    createOrder: createRequestState(),
    verify: createRequestState(),
  },
  reducers: {
    invoicesRequested: state =>
      requestReducers.requested(ensureRequestState(state, 'invoices')),
    invoicesSuccess: (state, action) =>
      requestReducers.success(ensureRequestState(state, 'invoices'), action),
    invoicesFailed: (state, action) =>
      requestReducers.failed(ensureRequestState(state, 'invoices'), action),
    invoicesReset: state =>
      requestReducers.reset(ensureRequestState(state, 'invoices')),
    createOrderRequested: state =>
      requestReducers.requested(ensureRequestState(state, 'createOrder')),
    createOrderSuccess: (state, action) =>
      requestReducers.success(ensureRequestState(state, 'createOrder'), action),
    createOrderFailed: (state, action) =>
      requestReducers.failed(ensureRequestState(state, 'createOrder'), action),
    verifyRequested: state =>
      requestReducers.requested(ensureRequestState(state, 'verify')),
    verifySuccess: (state, action) =>
      requestReducers.success(ensureRequestState(state, 'verify'), action),
    verifyFailed: (state, action) =>
      requestReducers.failed(ensureRequestState(state, 'verify'), action),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const listInvoices = (params?: object) =>
  apiCallBegan({
    params,
    method: methods.GET,
    url: apiRoutes.profile.invoices,
    onStart: actions.invoicesRequested.type,
    onFailed: actions.invoicesFailed.type,
    onSuccess: actions.invoicesSuccess.type,
  });

export const resetInvoices = actions.invoicesReset;

export const createOrder = (data: { invoice_number: string }) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.POST,
    url: apiRoutes.payments.createOrder,
    onStart: actions.createOrderRequested.type,
    onFailed: actions.createOrderFailed.type,
    onSuccess: actions.createOrderSuccess.type,
  });

export const verifyPayment = (data: {
  invoice_number: string;
  razorpay_order_id: string;
}) =>
  apiCallBegan({
    data,
    isRowData: true,
    method: methods.POST,
    url: apiRoutes.payments.verify,
    onStart: actions.verifyRequested.type,
    onFailed: actions.verifyFailed.type,
    onSuccess: actions.verifySuccess.type,
  });
