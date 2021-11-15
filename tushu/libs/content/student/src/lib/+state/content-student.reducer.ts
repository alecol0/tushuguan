import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, UPDATE } from '@ngrx/store';

import * as ContentStudentActions from './content-student.actions';
import { ContentStudentEntity } from './content-student.models';

export const CONTENT_STUDENT_FEATURE_KEY = 'contentStudent';

export interface State extends EntityState<ContentStudentEntity> {
  selectedId?: string | number; // which ContentStudent record has been selected
  loaded: boolean; // has the ContentStudent list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContentStudentPartialState {
  readonly [CONTENT_STUDENT_FEATURE_KEY]: State;
}

export const contentStudentAdapter: EntityAdapter<ContentStudentEntity> =
  createEntityAdapter<ContentStudentEntity>();

export const initialState: State = contentStudentAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const contentStudentReducer = createReducer(
  initialState,
  on(ContentStudentActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    ContentStudentActions.loadContentStudentSuccess,
    (state, { contentStudent }) =>
      contentStudentAdapter.setAll(contentStudent, { ...state, loaded: true })
  ),
  on(ContentStudentActions.loadContentStudentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // on(ContentStudentActions.addStudentSuccess, (state, { contentStudent }) =>
  //   contentStudentAdapter.addOne(contentStudent, { ...state, loaded: true })
  // ),
  // 增加成功, 向store中存储最新的用户信息
  on(ContentStudentActions.addStudentSuccess, (state, { contentStudent }) =>
    contentStudentAdapter.addOne(contentStudent, {
      ...state,
      loaded: true,
      selectedNo: contentStudent.studentNo,
    })
  ),
  // 更新成功, 向store中存储最新的用户信息
  on(ContentStudentActions.updateStudentSuccess, (state, { contentStudent }) =>
    contentStudentAdapter.upsertOne(contentStudent, {
      ...state,
      loaded: true,
      selectedId: contentStudent.id,
    })
  ),
  // 删除成功, 从store中移除
  on(
    ContentStudentActions.deleteStudentSuccess, (state, { contentStudent }) =>
      contentStudentAdapter.removeOne(contentStudent.id, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return contentStudentReducer(state, action);
}
