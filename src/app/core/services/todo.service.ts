import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/models/todo.model';
import { AuthService } from './auth.service';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  DocumentReference,
  deleteDoc,
  updateDoc,
  setDoc,
  doc,
  orderBy
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  constructor(private firestore: Firestore,
    private authService: AuthService) { }

  addItem(item: Todo, userId: string): Promise<DocumentReference> {    
    const colRef = collection(this.firestore, userId);
    return addDoc(colRef, item);
  }

  updateItem(item: Todo, userId: string):Promise<void> {
    const docRef = doc(this.firestore, `${userId}/${item.id}`);
    return setDoc(docRef, item);    
  }

  modifieDone(item: Todo, userId: string, done: boolean):Promise<void> {
    const docRef = doc(this.firestore, `${userId}/${item.id}`);
    return updateDoc(docRef, { done: done });
  }

  deleteItem(item: Todo, userId: string): Promise<void>{
    const docRef = doc(this.firestore, `${userId}/${item.id}`);
    return deleteDoc(docRef);
  }

  getItens(userId: string): Observable<Todo[]> {    
    const colRef = collection(this.firestore, userId);    
    return collectionData(colRef, { idField: 'id' }) as Observable<Todo[]>;
  }
}
