import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputHint = 'What needs to be done?';
  todos = [];
  todo = '';
  filterType = 'All';
  isToggleAll = false;

  constructor(http: HttpClient) {

  }

  addTodo() {
    if (this.todo) {
      let newTodo = {
        text: this.todo,
        done: false
      };
      // this.todos.push(newTodo);
      this.todos = this.todos.concat(newTodo);
      // this.todos = [...this.todos, newTodo];
      this.todo = '';
    }
  }

  todoInputChange($event) {
    this.todo = $event;
  }

  clearCompleted() {
    this.todos = this.todos
      .filter(item => !item.done);
  }

  filterTypeChange($event) {
    this.filterType = $event;
  }

  toggleAllChange() {
    this.todos.forEach(item => {
      item.done = this.isToggleAll;
    });
  }

  removeTodo(todo) {
    this.todos = this.todos.filter(item => item !== todo);
  }

}
