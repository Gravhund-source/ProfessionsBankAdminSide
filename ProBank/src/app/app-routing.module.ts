import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AdminSideComponent } from './Admin/admin-side/admin-side.component';
import { SignInComponent } from './Login/sign-in/sign-in.component';
import { AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: SignInComponent},
  { path: 'admin', component: AdminSideComponent, canActivate:[
    AuthGuard
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }