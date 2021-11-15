import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromContentStudent from './+state/content-student.reducer';
import { ContentStudentEffects } from './+state/content-student.effects';
import { ContentStudentFacade } from './+state/content-student.facade';
import { DoFormComponent } from './do-form/do-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConfirmComponent } from './confirm/confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    NgxDatatableModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    StoreModule.forFeature(
      fromContentStudent.CONTENT_STUDENT_FEATURE_KEY,
      fromContentStudent.reducer
    ),
    EffectsModule.forFeature([ContentStudentEffects]),
  ],
  declarations: [
    FormComponent,
    DoFormComponent,
    ConfirmComponent,
    RegisterComponent,
    MainComponent,
  ],
  exports: [FormComponent],
  providers: [ContentStudentFacade],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentStudentModule {}
