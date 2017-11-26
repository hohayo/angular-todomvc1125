import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

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

  constructor(private dataSvc: DataService) {
  }

  ngOnInit() {
    this.dataSvc.getTodos()
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
      this.dataSvc.addTodo(newTodo)
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
    this.dataSvc.removeTodo(todo)
      .subscribe(data => {
        this.todos = this.todos.filter(item => item !== todo);
      }, error => {
        // error handling
      }, () => {
        // completed
      });
  }

  updateTodo(todo) {
    this.dataSvc.updateTodo(todo)
      .subscribe(data => {
        // Bug: 使用 footer 元件下的 Active 來顯示尚未完成的待辦事項，此時勾選其中一個待辦事項，該待辦事項未從列表中消失。
        // 解決方式: 修改 todos 的參考來觸發 Angular 變更偵測
        this.todos = [...this.todos];
        // 也可使用其他方式來觸發變更偵測，關鍵字: ChangeDetectorRef
        // https://angular.io/api/core/ChangeDetectorRef
      });
  }

}
