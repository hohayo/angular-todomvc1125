import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputHint = 'What needs to be done?';
  todos = [];
  todo = '';

  addTodo() {
    if (this.todo) {
      let newTodo = {
        text: this.todo,
        done: false
      };
      this.todos.push(newTodo);
      this.todo = '';
    }
  }

  todoInputChange($event) {
    this.todo = $event;
  }

}
