import { Injectable } from '@angular/core';
import { AuthPipeGenerator, emailVerified } from '@angular/fire/auth-guard'
import { BehaviorSubject, map, Observable, pipe, skip } from 'rxjs';
import {
  Auth,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';



export const redirectUnauthorizedOrUnverifiedUser: AuthPipeGenerator = () => map(user => user ? (user.emailVerified || ['verify-email']) : ['sign-in']);
export const redirectVerifiedTo = (redirect: any[]) => pipe(emailVerified, map(verified => !verified || redirect));

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private verified: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getUserId(): Observable<string> {
    return this.userId.asObservable();
  }
  
  getCurrentUserId(): string {
    return this.userId.getValue();
  }

  getAuthorized(): Observable<boolean> {
    return this.authorized.asObservable().pipe(skip(1));
  }

  getVerified(): Observable<boolean> {
    return this.verified.asObservable().pipe(skip(1));
  }

  constructor(private auth: Auth) { 
    auth.onAuthStateChanged(user => {
      if(user){
        this.userId.next(user.uid);
      }
      this.authorized.next(!!user);
    });
  }
  
  async emailSignIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  async emailSignUp(email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credential.user, { displayName: credential.user.displayName });
    return sendEmailVerification(this.auth.currentUser!);
  }
  
  async resetPassword(email: string): Promise<any> {
    return sendPasswordResetEmail(this.auth, email);
  }
  
  async confirmPassword(code: string, newPassword: string): Promise<void> {
    return confirmPasswordReset(this.auth, code, newPassword);
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }

  waitForEmailVerification(): Promise<void> {
    return new Promise((resolve, reject) => {
      var interval = setInterval(() => {
        this.auth.currentUser?.reload().then(() => {
          if(this.auth.currentUser?.emailVerified){
            clearInterval(interval)
            resolve();
          }      
        });
      }, 1000);
    });
  }

  getUserEmail(): string {
    return this.auth.currentUser?.email || "";
  }
}
