import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  error: Subject<string> = new Subject<string>();
  show(error: string){
    this.error.next(error);
  }
}
