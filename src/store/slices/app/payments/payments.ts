import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'payments',
  initialState: {
    createOrder: createRequestState(),
    verify: createRequestState(),
  },
  reducers: {
    createOrderRequested: state => requestReducers.requested(state.createOrder),
    createOrderSuccess: (state, action) =>
      requestReducers.success(state.createOrder, action),
    createOrderFailed: (state, action) =>
      requestReducers.failed(state.createOrder, action),
    verifyRequested: state => requestReducers.requested(state.verify),
    verifySuccess: (state, action) =>
      requestReducers.success(state.verify, action),
    verifyFailed: (state, action) =>
      requestReducers.failed(state.verify, action),
  },
});

export const actions = slice.actions;
export default slice.reducer;

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
