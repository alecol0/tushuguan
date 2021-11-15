/* eslint-disable no-case-declarations */
import {
  addStudent,
} from './../+state/content-student.actions';
import { ContentStudentFacade } from './../+state/content-student.facade';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'shiba-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  Title!: string;
  id!: number;
  stu: any;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public router: Router,
    private facade: ContentStudentFacade
  ) {}

  ngOnInit(): void {
    console.log(this.data.student);
  }

  doFirm() {
    this.facade.register(addStudent({ contentStudent: this.data.student }));
    this.dialog.closeAll();
    this.router.navigate([`main`]);
  }
}
