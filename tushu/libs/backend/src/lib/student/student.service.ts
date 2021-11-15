/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentStudentEntity, ContentStudentFacade } from '@shiba/content/student';
import { map, switchMap } from 'rxjs/operators';
import {timer} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students$!: Observable<any[]>;
  studentArray: any[] = [];

  constructor(private http: HttpClient, private facade: ContentStudentFacade) {
    this.students$ = this.facade.allContentStudent$;
    this.students$.subscribe((data) => {
      this.studentArray = data;
    });
  }

  /**
   * mock服务器接口
   */
  private readonly API = 'http://localhost:3300/tushu';

  /**
   * 获取student全部数据
   */
  public getAll(): Observable<ContentStudentEntity[]> {
    return this.http.get(`${this.API}`).pipe(map((data) => (data || []) as ContentStudentEntity[]));
  }

  /**
   * 增加
   */
  public addStudent(student: any): Observable<ContentStudentEntity> {
    this.studentArray.push(student);
    return this.http
      .post(`${this.API}`, student)
      .pipe(map((data) => data as ContentStudentEntity));
  }

  /**
   * 根据 id 更新
   */
  public updateStudent(
    id: number,
    student: any
  ): Observable<ContentStudentEntity> {
    return this.http
      .patch(`${this.API}/${id}`, student)
      .pipe(map((data) => data as ContentStudentEntity));
  }

  /**
   * 根据 id 删除
   */
  public deleteStudent(id: number): Observable<any> {
    this.studentArray = this.studentArray.filter(
      (item) => Number(item.id) != id
    );
    console.log(this.studentArray);
    return this.http
      .delete(`${this.API}/${id}`)
      .pipe(map((data: any) => data as ContentStudentEntity));
  }
}
