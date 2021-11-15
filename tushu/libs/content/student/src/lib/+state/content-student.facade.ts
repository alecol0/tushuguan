import { addStudent } from './content-student.actions';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ContentStudentActions from './content-student.actions';
import { loadContentStudent } from './content-student.actions';
import * as ContentStudentFeature from './content-student.reducer';
import * as ContentStudentSelectors from './content-student.selectors';

@Injectable()
export class ContentStudentFacade {

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(ContentStudentSelectors.getContentStudentLoaded)
  );
  allContentStudent$ = this.store.pipe(
    select(ContentStudentSelectors.getAllContentStudent)
  );
  selectedContentStudent$ = this.store.pipe(
    select(ContentStudentSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ContentStudentActions.init());
  }
  loadAll() {
    this.store.dispatch(loadContentStudent())
  }
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
  register(action: Action) {
    console.log(action);
    this.store.dispatch(action);
  }
}
