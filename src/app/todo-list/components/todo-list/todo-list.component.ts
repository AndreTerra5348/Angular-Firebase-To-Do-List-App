import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from '../../../core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todoList: Todo[] = []

  todoFormGroup = this.fb.group({
    todo: ''
  });

  constructor(private fb: FormBuilder,
    private todoService: TodoService,
    private authService: AuthService,
    private loaderService: LoaderService) {
    loaderService.show();
    authService.getUserId().subscribe(userId => this.todoService.getItens(userId).subscribe(todoList => this.contentLoaded(todoList)));
  }

  contentLoaded(todoList: Todo[]): void {
    this.loaderService.hide();
    this.todoList = todoList;
  }

  onSubmit(): void {
    if (this.todoFormGroup.valid) {
      var text: string = this.todoFormGroup.value.todo;
      var item: Todo = { text: text, done: false };
      var userId = this.authService.getCurrentUserId();
      this.todoService.addItem(item, userId).then(() => this.todoFormGroup.reset());
    }
  }

  delete(item: Todo): void {
    var userId = this.authService.getCurrentUserId();
    this.todoService.deleteItem(item, userId);
  }

  done(item: Todo): void {
    var userId = this.authService.getCurrentUserId();
    this.todoService.modifieDone(item, userId, !item.done)
  }
}
