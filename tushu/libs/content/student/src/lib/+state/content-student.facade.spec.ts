import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ContentStudentActions from './content-student.actions';
import { ContentStudentEffects } from './content-student.effects';
import { ContentStudentFacade } from './content-student.facade';
import { ContentStudentEntity } from './content-student.models';
import {
  CONTENT_STUDENT_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './content-student.reducer';
import * as ContentStudentSelectors from './content-student.selectors';

interface TestSchema {
  contentStudent: State;
}

describe('ContentStudentFacade', () => {
  let facade: ContentStudentFacade;
  let store: Store<TestSchema>;
  const createContentStudentEntity = (
    id: string,
    name = ''
  ): ContentStudentEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONTENT_STUDENT_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ContentStudentEffects]),
        ],
        providers: [ContentStudentFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ContentStudentFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allContentStudent$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allContentStudent$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadContentStudentSuccess` to manually update list
     */
    it('allContentStudent$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allContentStudent$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ContentStudentActions.loadContentStudentSuccess({
          contentStudent: [
            createContentStudentEntity('AAA'),
            createContentStudentEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allContentStudent$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
