import { NgModule } from '@angular/core';
import { canActivate } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { redirectVerifiedTo } from '../core/services/auth.service';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const redirectVerifiedToTodoList = () => redirectVerifiedTo(['todo-list']);

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, ...canActivate(redirectVerifiedToTodoList) },
  { path: 'sign-up', component: SignUpComponent, ...canActivate(redirectVerifiedToTodoList) },
  { path: 'forgot-password', component: ForgotPasswordComponent, ...canActivate(redirectVerifiedToTodoList) },
  { path: 'verify-email', component: VerifyEmailComponent, ...canActivate(redirectVerifiedToTodoList) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
