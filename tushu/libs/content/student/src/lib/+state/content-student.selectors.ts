import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTENT_STUDENT_FEATURE_KEY,
  State,
  contentStudentAdapter,
} from './content-student.reducer';

// Lookup the 'ContentStudent' feature state managed by NgRx
export const getContentStudentState = createFeatureSelector<State>(
  CONTENT_STUDENT_FEATURE_KEY
);

const { selectAll, selectEntities } = contentStudentAdapter.getSelectors();

export const getContentStudentLoaded = createSelector(
  getContentStudentState,
  (state: State) => state.loaded
);

export const getContentStudentError = createSelector(
  getContentStudentState,
  (state: State) => state.error
);

export const getAllContentStudent = createSelector(
  getContentStudentState,
  (state: State) => selectAll(state)
);

export const getContentStudentEntities = createSelector(
  getContentStudentState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getContentStudentState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getContentStudentEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
