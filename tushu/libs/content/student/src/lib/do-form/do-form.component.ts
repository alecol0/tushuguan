/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable prefer-const */
import { ConfirmComponent } from './../confirm/confirm.component';
import { StudentService } from '@shiba/backend';
import { Component, OnInit } from '@angular/core';
import { ContentStudentEntity, ContentStudentFacade } from '../..';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'shiba-do-form',
  templateUrl: './do-form.component.html',
  styleUrls: ['./do-form.component.css'],
})
export class DoFormComponent implements OnInit {
  id: number = 0;
  student: any;
  studentList: Array<ContentStudentEntity> = [];
  // 存储所有的No对象
  arrNo: number[] = [];
  currentNo: number = 0;
  students$!: Observable<ContentStudentEntity[]>;

  // 从页面输入的值的输入规则
  /** 学号 */
  studentNo = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);
  /** 密码 */
  password = new FormControl('', [
    Validators.required
  ]);

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private facade: ContentStudentFacade,
  ) {
    this.students$ = this.facade.allContentStudent$;
    this.students$.subscribe((data) => {
      this.student = data;
      console.log(this.student);
    });
    this.facade.loadAll();
  }

  ngOnInit(): void {
    return;
  }

  /**
   * 登录
   */
  doForm() {
    const student = {
      studentNo: +this.studentNo.value,
      password: +this.password.value
    };
    console.log(student);
    // if (
    //   student.studentNo === this.student.studentNo &&
    //   student.password === this.student.password
    // ) {
      this.router.navigate(['main']);
    // }
  }

  /** 注册 */
  register() {
    this.router.navigate(['register']);
  }

  getstudentNoErrorMessage() {
    if (this.studentNo.hasError('required')) {
      return '必须输入';
    }
    return '请输入数字';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return '必须输入';
    }
    return '';
  }

  validateNumber() {
    const currentNo = this.studentNo.value;
    if (this.arrNo.find((n) => n === +currentNo)) {
      this.studentNo.setErrors({ exists: true });
    }
    console.log(this.arrNo);
  }
}
