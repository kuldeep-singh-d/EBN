import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

type EliteActivitiesListParams = {
  page?: number;
  tab?: string;
  type?: string;
};

const slice = createSlice({
  name: 'eliteActivities',
  initialState: {
    list: createRequestState(),
  },
  reducers: {
    listRequested: state => requestReducers.requested(state.list),
    listSuccess: (state, action) => requestReducers.success(state.list, action),
    listFailed: (state, action) => requestReducers.failed(state.list, action),
    listReset: state => requestReducers.reset(state.list),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const listEliteActivities = (params: EliteActivitiesListParams) =>
  apiCallBegan({
    params,
    method: methods.GET,
    url: apiRoutes.eliteActivities.list,
    onStart: actions.listRequested.type,
    onFailed: actions.listFailed.type,
    onSuccess: actions.listSuccess.type,
  });

export const resetEliteActivitiesList = () => ({
  type: actions.listReset.type,
});
