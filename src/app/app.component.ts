import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  inputHint = 'What needs to be done?';
  todos = [];
  todo = '';
  filterType = 'All';
  isToggleAll = false;
  apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => {
        this.todos = data;
      });
  }

  addTodo() {
    if (this.todo) {
      let newTodo = {
        text: this.todo,
        done: false
      };
      // this.todos.push(newTodo);
      // this.todos = [...this.todos, newTodo];
      this.http.post(this.apiUrl, newTodo)
        .subscribe(data => {
          this.todos = this.todos.concat(data);
          this.todo = '';
        });
    }
  }

  todoInputChange($event) {
    this.todo = $event;
  }

  clearCompleted() {
    this.todos
      .filter(item => item.done)
      .forEach(item => {
        this.removeTodo(item);
      });
  }

  filterTypeChange($event) {
    this.filterType = $event;
  }

  toggleAllChange() {
    this.todos.forEach(item => {
      item.done = this.isToggleAll;
      this.updateTodo(item);
    });
  }

  removeTodo(todo) {
    this.http.delete(`${this.apiUrl}/${todo.id}`)
      .subscribe(data => {
        this.todos = this.todos.filter(item => item !== todo);
      });
  }

  updateTodo(todo) {
    this.http.put(`${this.apiUrl}/${todo.id}`, todo)
      .subscribe();
  }

}
