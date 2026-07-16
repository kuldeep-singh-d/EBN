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
  name: 'eliteMembers',
  initialState: {
    chapterMembers: createRequestState(),
    search: createRequestState(),
    detail: createRequestState(),
  },
  reducers: {
    chapterMembersRequested: state =>
      requestReducers.requested(ensureRequestState(state, 'chapterMembers')),
    chapterMembersSuccess: (state, action) =>
      requestReducers.success(
        ensureRequestState(state, 'chapterMembers'),
        action,
      ),
    chapterMembersFailed: (state, action) =>
      requestReducers.failed(
        ensureRequestState(state, 'chapterMembers'),
        action,
      ),
    chapterMembersReset: state =>
      requestReducers.reset(ensureRequestState(state, 'chapterMembers')),
    searchRequested: state =>
      requestReducers.requested(ensureRequestState(state, 'search')),
    searchSuccess: (state, action) =>
      requestReducers.success(ensureRequestState(state, 'search'), action),
    searchFailed: (state, action) =>
      requestReducers.failed(ensureRequestState(state, 'search'), action),
    searchReset: state =>
      requestReducers.reset(ensureRequestState(state, 'search')),
    detailRequested: state =>
      requestReducers.requested(ensureRequestState(state, 'detail')),
    detailSuccess: (state, action) =>
      requestReducers.success(ensureRequestState(state, 'detail'), action),
    detailFailed: (state, action) =>
      requestReducers.failed(ensureRequestState(state, 'detail'), action),
    detailReset: state =>
      requestReducers.reset(ensureRequestState(state, 'detail')),
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

export const searchEliteMembers = (params?: object) =>
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

export const resetChapterMembers = actions.chapterMembersReset;
export const resetEliteMemberSearch = actions.searchReset;
export const resetEliteMemberDetail = actions.detailReset;
