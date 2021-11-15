/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from './../confirm/confirm.component';
import { StudentService } from '@shiba/backend';
import { ContentStudentEntity, ContentStudentFacade } from '../..';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'shiba-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
    Validators.required,
    Validators.pattern(/^[一-龥A-Za-z0-9_^%;=?@$"]+$/),
  ]);
  /** 用户名 */
  username = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[一-龥A-Za-z0-9_^%;=?@$"]+$/),
  ]);
  /** 电话 */
  telephone = new FormControl('', [Validators.pattern(/^[0-9]+$/)]);

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private facade: ContentStudentFacade,
    private location: Location
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

  /** 返回 */
  returnO() {
    this.location.back();
  }

  registerLogin() {
    const student = {
      id: +this.id,
      studentNo: +this.studentNo.value,
      password: +this.password.valid,
      username: this.username.value,
      telephone: this.telephone.value,
    };
    console.log(student);
    this.dialog.open(ConfirmComponent, {
      data: {
        student: student
      },
      disableClose: true,
    })
  }

  getstudentNoErrorMessage() {
    if (this.studentNo.hasError('required')) {
      return '必须输入';
    }
    return '请输入数字且无空格';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return '必须输入';
    }
    return '请勿输入空格';
  }

}
