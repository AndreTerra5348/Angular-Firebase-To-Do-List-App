import { TitleCasePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FirebaseError } from '@angular/fire/app/firebase';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SignUpSignInComponent } from '../AuthBaseComponents';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends SignUpSignInComponent {
  @ViewChild(MatButton) button!: MatButton;

  constructor(private authService: AuthService,
    private router: Router,
    loaderService: LoaderService,
    titleCasePipe: TitleCasePipe) { super(titleCasePipe, loaderService); }

  setButtonDisabled(disabled: boolean): void {
    this.button.disabled = disabled;
  }

  onSubmit(email: string, password: string): void {
    this.authService.emailSignIn(email, password)
      .then(() => this.router.navigate(['todo-list']))
      .catch((err: FirebaseError) => this.handleError(err));
  }
}
