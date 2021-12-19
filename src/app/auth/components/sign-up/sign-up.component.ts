import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app/firebase';
import { AuthService } from 'src/app/core/services/auth.service';
import { TitleCasePipe } from '@angular/common';
import { SignUpSignInBase } from '../AuthBase';
import { MatButton } from '@angular/material/button';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends SignUpSignInBase {
  @ViewChild(MatButton) button!: MatButton;

  constructor(private authService: AuthService,
    private router: Router,
    loaderService: LoaderService,
    titleCasePipe: TitleCasePipe) { super(titleCasePipe, loaderService) }

  setButtonDisabled(disabled: boolean): void {
    this.button.disabled = disabled;
  }

  onSubmit(email: string, password: string): void {
    this.authService.emailSignUp(this.form.value.email, this.form.value.password)
    .then(() => this.router.navigate(['verify-email/']))
    .catch((err: FirebaseError) => this.handleError(err));
  }
}
