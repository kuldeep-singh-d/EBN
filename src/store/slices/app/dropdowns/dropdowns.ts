import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from '@store/apiActions';
import { apiRoutes, methods } from '@store/apiRoutes';
import { createRequestState, requestReducers } from '../../createRequestSlice';

const slice = createSlice({
  name: 'dropdowns',
  initialState: {
    regions: createRequestState(),
    chapters: createRequestState(),
    members: createRequestState(),
    categories: createRequestState(),
    subCategories: createRequestState(),
  },
  reducers: {
    regionsRequested: state => requestReducers.requested(state.regions),
    regionsSuccess: (state, action) =>
      requestReducers.success(state.regions, action),
    regionsFailed: (state, action) =>
      requestReducers.failed(state.regions, action),
    chaptersRequested: state => requestReducers.requested(state.chapters),
    chaptersSuccess: (state, action) =>
      requestReducers.success(state.chapters, action),
    chaptersFailed: (state, action) =>
      requestReducers.failed(state.chapters, action),
    membersRequested: state => requestReducers.requested(state.members),
    membersSuccess: (state, action) =>
      requestReducers.success(state.members, action),
    membersFailed: (state, action) =>
      requestReducers.failed(state.members, action),
    categoriesRequested: state => requestReducers.requested(state.categories),
    categoriesSuccess: (state, action) =>
      requestReducers.success(state.categories, action),
    categoriesFailed: (state, action) =>
      requestReducers.failed(state.categories, action),
    subCategoriesRequested: state =>
      requestReducers.requested(state.subCategories),
    subCategoriesSuccess: (state, action) =>
      requestReducers.success(state.subCategories, action),
    subCategoriesFailed: (state, action) =>
      requestReducers.failed(state.subCategories, action),
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const getRegionsDropdown = () =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.dropdowns.regions,
    onStart: actions.regionsRequested.type,
    onFailed: actions.regionsFailed.type,
    onSuccess: actions.regionsSuccess.type,
  });

export const getChaptersByRegionDropdown = (regionId: string | number) =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.dropdowns.chaptersByRegion(regionId),
    onStart: actions.chaptersRequested.type,
    onFailed: actions.chaptersFailed.type,
    onSuccess: actions.chaptersSuccess.type,
  });

export const getMembersByChapterDropdown = (chapterId: string | number) =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.dropdowns.membersByChapter(chapterId),
    onStart: actions.membersRequested.type,
    onFailed: actions.membersFailed.type,
    onSuccess: actions.membersSuccess.type,
  });

export const getCategoriesDropdown = () =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.dropdowns.categories,
    onStart: actions.categoriesRequested.type,
    onFailed: actions.categoriesFailed.type,
    onSuccess: actions.categoriesSuccess.type,
  });

export const getSubCategoriesDropdown = (categoryId: string | number) =>
  apiCallBegan({
    method: methods.GET,
    url: apiRoutes.dropdowns.subCategoriesByCategory(categoryId),
    onStart: actions.subCategoriesRequested.type,
    onFailed: actions.subCategoriesFailed.type,
    onSuccess: actions.subCategoriesSuccess.type,
  });
