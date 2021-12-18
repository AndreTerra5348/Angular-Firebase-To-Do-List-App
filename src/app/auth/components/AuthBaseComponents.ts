import { TitleCasePipe } from '@angular/common';
import { FirebaseError } from '@angular/fire/app/firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader.service';

export class AuthBaseComponent {
  error: string = "";

  constructor(private titleCasePipe: TitleCasePipe,
    private loaderService: LoaderService) {
    this.stopLoading();
  }


  startLoading(): void {
    this.loaderService.show();
  }

  stopLoading(): void {
    this.loaderService.hide();
  }

  handleError(err: FirebaseError): void {
    this.error = err.code.replace('auth/', '').split('-').join(' ');
    this.error = this.titleCasePipe.transform(this.error);
    this.stopLoading();
  }
}

export abstract class SignUpSignInComponent extends AuthBaseComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(titleCasePipe: TitleCasePipe,
    loaderService: LoaderService) { super(titleCasePipe, loaderService) }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.setButtonDisabled(true);
    this.startLoading();
    this.onSubmit(this.form.value.email, this.form.value.password);
  }

  abstract setButtonDisabled(disabled: boolean): void;
  abstract onSubmit(email: string, password: string): void;

  override handleError(err: FirebaseError): void {
    this.setButtonDisabled(false);
    super.handleError(err);
    if (err.code.includes("email") || err.code.includes("user")) {
      this.form.controls['email'].reset();
    } else if (err.code.includes("password")) {
      this.form.controls['password'].reset();
    }
  }
}