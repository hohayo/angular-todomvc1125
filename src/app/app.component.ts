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
      this.todos.push(this.todo);
      this.todo = '';
    }
  }

}
