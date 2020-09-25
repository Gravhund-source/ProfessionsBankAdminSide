import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSideComponent } from './Admin/admin-side/admin-side.component';
import { SignInComponent } from './Login/sign-in/sign-in.component';
import { HttpService } from './Service/http.service';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch:'full' },
  { path: 'login', component: SignInComponent},
  { path: 'admin', component: AdminSideComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }