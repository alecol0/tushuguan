import { createAction, props } from '@ngrx/store';
import { ContentStudentEntity } from './content-student.models';

export const init = createAction('[ContentStudent Page] Init');

/**
 * 加载用户Action
 */
export const loadContentStudent = createAction(
  '[ContentStudent] Load ContentStudent'
);
/**
 * 加载全部用户成功Action
 */
export const loadContentStudentSuccess = createAction(
  '[ContentStudent/API] Load ContentStudent Success',
  props<{ contentStudent: ContentStudentEntity[] }>()
);
/**
 * 加载全部用户失败Action
 */
export const loadContentStudentFailure = createAction(
  '[ContentStudent/API] Load ContentStudent Failure',
  props<{ error: any }>()
);

/** 添加用户Action */
export const addStudent = createAction(
  '[ContentStudent] Add ContentStudent',
  props<{ contentStudent: ContentStudentEntity }>()
);
/** 添加用户成功Action */
export const addStudentSuccess = createAction(
  '[ContentStudent] Add ContentStudent Success',
  props<{ contentStudent: ContentStudentEntity }>()
);

/** 更新用户Action */
export const updateStudent = createAction(
  '[ContentStudent] Update ContentStudent',
  props<{ id: number; contentStudent: any }>()
);
/** 更新用户成功Action */
export const updateStudentSuccess = createAction(
  '[ContentStudent] Update ContentStudent Success',
  props<{ contentStudent: any }>()
);

/** 删除用户Action */
export const deleteStudent = createAction(
  '[ContentStudent] Delete ContentStudent',
  props<{ id: number; contentStudent: any }>()
);
/** 删除用户成功Action */
export const deleteStudentSuccess = createAction(
  '[ContentStudent] Delete ContentStudent Success',
  props<{ contentStudent: any }>()
);
