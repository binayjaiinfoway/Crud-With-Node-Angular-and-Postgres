import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  {
    path:'dashboard', component:FormsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
