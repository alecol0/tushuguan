/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ContentStudentActions from './content-student.actions';
import { StudentService } from '@shiba/backend';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ContentStudentEffects {
  /** 直接从action流里面获取 构造方法中注入 service*/
  loadContentStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentStudentActions.loadContentStudent),
      fetch({
        run: (action) => {
          return this.service.getAll().pipe(
            // 正常，发出成功action
            map((data) =>
              ContentStudentActions.loadContentStudentSuccess({
                contentStudent: data,
              })
            ),
            // 异常，发出失败action
            catchError((err) =>
              of(
                ContentStudentActions.loadContentStudentFailure({
                  error: (err as HttpErrorResponse).message,
                })
              )
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ContentStudentActions.loadContentStudentFailure({ error });
        },
      })
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentStudentActions.addStudent),
      fetch({
        run: (action) => {
          return this.service.addStudent(action.contentStudent).pipe(
            // 正常，发出成功action
            map((data) =>
              ContentStudentActions.addStudentSuccess({ contentStudent: data })
            )
          );
        },
      })
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentStudentActions.updateStudent),
      fetch({
        run: (action) => {
          // 取出参数id，更新用户数据
          return this.service
            .updateStudent(action.contentStudent.id, action.contentStudent)
            .pipe(
              // 正常，发出成功action
              map((data) =>
                ContentStudentActions.updateStudentSuccess({
                  contentStudent: data,
                })
              )
            );
        },
      })
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentStudentActions.deleteStudent),
      fetch({
        run: (action) => {
          // 取出参数id，删除用户数据
          return this.service.deleteStudent(action.id).pipe(
            // 正常，发出成功action
            map((data) =>
              ContentStudentActions.deleteStudentSuccess({
                contentStudent: data,
              })
            )
          );
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private service: StudentService
  ) {}
}
