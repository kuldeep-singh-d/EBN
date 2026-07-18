import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'meetings',
  initialState: {
    qrCode: createRequestState(),
  },
  reducers: {
    qrCodeRequested: state => requestReducers.requested(state.qrCode),
    qrCodeSuccess: (state, action) =>
      requestReducers.success(state.qrCode, action),
    qrCodeFailed: (state, action) =>
      requestReducers.failed(state.qrCode, action),
    qrCodeReset: state => requestReducers.reset(state.qrCode),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const getMeetingQrCode = (meetingId: string | number) =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.meetings.qrCode(meetingId),
    onStart: actions.qrCodeRequested.type,
    onFailed: actions.qrCodeFailed.type,
    onSuccess: actions.qrCodeSuccess.type,
  });

export const resetMeetingQrCode = actions.qrCodeReset;
