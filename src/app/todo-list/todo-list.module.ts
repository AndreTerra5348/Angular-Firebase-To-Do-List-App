import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';

import { MaterialModule } from '../material/material.module'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    TodoListRoutingModule,
    SharedModule,    
  ]
})
export class TodoListModule { }
