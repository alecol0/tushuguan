/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DoFormComponent } from 'libs/content/student/src/lib/do-form/do-form.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RouterModule, Routes } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RegisterComponent } from 'libs/content/student/src/lib/register/register.component';
import { MainComponent } from 'libs/content/student/src/lib/main/main.component';
import { FormComponent } from 'libs/content/student/src/lib/form/form.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: DoFormComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent},
  {path: 'list', component: FormComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
