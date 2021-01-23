import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeavesComponent} from './leaves/leaves.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'leaves', component: LeavesComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
