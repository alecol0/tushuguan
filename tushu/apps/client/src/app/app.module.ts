// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ContentStudentModule } from './../../../../libs/content/student/src/lib/content-student.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BackendModule } from '@shiba/backend';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  imports: [
    // MatButtonModule,
    // MatInputModule,
    // MatSelectModule,
    // MatFormFieldModule,
    // NgxDatatableModule,
    // ReactiveFormsModule,
    // FormsModule,
    MatDialogModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BrowserModule,
    ContentStudentModule,
    AppRoutingModule,
    BackendModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
