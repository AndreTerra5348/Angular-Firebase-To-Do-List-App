import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AuthBaseComponent } from '../AuthBaseComponents';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']

})
export class ForgotPasswordComponent extends AuthBaseComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });

  constructor(private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    loaderService: LoaderService,
    titleCasePipe: TitleCasePipe) { super(titleCasePipe, loaderService); }

  submit() {
    this.authService.resetPassword(this.form.value.email)
      .then(() => {
        this.snackBar.open("Reset Link Sent", 'x');
        this.router.navigate(["sign-in"]);
      })
      .catch((err) => this.handleError(err));
  }
}
