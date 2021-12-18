import { NgModule } from '@angular/core';
import { canActivate } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedOrUnverifiedUser } from '../core/services/auth.service';

import { TodoListComponent } from './components/todo-list/todo-list.component';


const routes: Routes = [
  {path: '', component: TodoListComponent, ...canActivate(redirectUnauthorizedOrUnverifiedUser)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule { }
