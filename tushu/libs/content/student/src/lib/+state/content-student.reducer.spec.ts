import { Action } from '@ngrx/store';

import * as ContentStudentActions from './content-student.actions';
import { ContentStudentEntity } from './content-student.models';
import { State, initialState, reducer } from './content-student.reducer';

describe('ContentStudent Reducer', () => {
  const createContentStudentEntity = (
    id: string,
    name = ''
  ): ContentStudentEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid ContentStudent actions', () => {
    it('loadContentStudentSuccess should return the list of known ContentStudent', () => {
      const contentStudent = [
        createContentStudentEntity('PRODUCT-AAA'),
        createContentStudentEntity('PRODUCT-zzz'),
      ];
      const action = ContentStudentActions.loadContentStudentSuccess({
        contentStudent,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
