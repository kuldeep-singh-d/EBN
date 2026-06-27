import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'eliteMembers',
  initialState: {
    chapterMembers: createRequestState(),
    search: createRequestState(),
    detail: createRequestState(),
  },
  reducers: {
    chapterMembersRequested: state =>
      requestReducers.requested(state.chapterMembers),
    chapterMembersSuccess: (state, action) =>
      requestReducers.success(state.chapterMembers, action),
    chapterMembersFailed: (state, action) =>
      requestReducers.failed(state.chapterMembers, action),
    searchRequested: state => requestReducers.requested(state.search),
    searchSuccess: (state, action) =>
      requestReducers.success(state.search, action),
    searchFailed: (state, action) =>
      requestReducers.failed(state.search, action),
    detailRequested: state => requestReducers.requested(state.detail),
    detailSuccess: (state, action) =>
      requestReducers.success(state.detail, action),
    detailFailed: (state, action) =>
      requestReducers.failed(state.detail, action),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const getChapterMembers = () =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.eliteMembers.chapterMembers,
    onStart: actions.chapterMembersRequested.type,
    onFailed: actions.chapterMembersFailed.type,
    onSuccess: actions.chapterMembersSuccess.type,
  });

export const searchEliteMembers = (
  params = { tab: 'chapter', search: 'software' },
) =>
  apiCallBegan({
    params,
    method: methods.GET,
    url: apiRoutes.eliteMembers.search,
    onStart: actions.searchRequested.type,
    onFailed: actions.searchFailed.type,
    onSuccess: actions.searchSuccess.type,
  });

export const showEliteMember = (id: string | number) =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.eliteMembers.show(id),
    onStart: actions.detailRequested.type,
    onFailed: actions.detailFailed.type,
    onSuccess: actions.detailSuccess.type,
  });
