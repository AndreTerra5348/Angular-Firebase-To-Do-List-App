import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthGuardModule } from '@angular/fire/auth-guard';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { MaterialModule } from '../material/material.module'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignInComponent, 
    SignUpComponent, 
    VerifyEmailComponent, 
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    AuthGuardModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule { }
