import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {

  email: string = "";
  constructor(private authService: AuthService,
    private router: Router) {
    this.email = authService.getUserEmail();
    authService.waitForEmailVerification().then(() => router.navigate(['']));
  }

  submit(): void {
    this.authService.waitForEmailVerification().then(() => this.router.navigate(['']));
  }
}
