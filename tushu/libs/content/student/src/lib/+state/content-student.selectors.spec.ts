import { ContentStudentEntity } from './content-student.models';
import {
  contentStudentAdapter,
  ContentStudentPartialState,
  initialState,
} from './content-student.reducer';
import * as ContentStudentSelectors from './content-student.selectors';

describe('ContentStudent Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getContentStudentId = (it: ContentStudentEntity) => it.id;
  const createContentStudentEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ContentStudentEntity);

  let state: ContentStudentPartialState;

  beforeEach(() => {
    state = {
      contentStudent: contentStudentAdapter.setAll(
        [
          createContentStudentEntity('PRODUCT-AAA'),
          createContentStudentEntity('PRODUCT-BBB'),
          createContentStudentEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('ContentStudent Selectors', () => {
    it('getAllContentStudent() should return the list of ContentStudent', () => {
      const results = ContentStudentSelectors.getAllContentStudent(state);
      const selId = getContentStudentId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ContentStudentSelectors.getSelected(
        state
      ) as ContentStudentEntity;
      const selId = getContentStudentId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getContentStudentLoaded() should return the current "loaded" status', () => {
      const result = ContentStudentSelectors.getContentStudentLoaded(state);

      expect(result).toBe(true);
    });

    it('getContentStudentError() should return the current "error" state', () => {
      const result = ContentStudentSelectors.getContentStudentError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
