import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do'

import { NotifyService } from './notify.service';

@Injectable()
export class DataService {

  apiUrl = 'http://localhost:3000/todos';

  constructor(
    private http: HttpClient,
    private notifySvc: NotifyService
  ) { }

  getTodos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTodo(newTodo) {
    return this.http.post(this.apiUrl, newTodo)
      .do(data => {
        this.notifySvc.notify(`已將 ${newTodo.text} 新增到 DB`);
      });
  }

  removeTodo(todo) {
    return this.http.delete(`${this.apiUrl}/${todo.id}`)
      .do(data => {
        this.notifySvc.notify(`已將 ${todo.text} 從 DB 刪除`);
      });
  }

  updateTodo(todo) {
    return this.http.put(`${this.apiUrl}/${todo.id}`, todo)
      .do(data => {
        this.notifySvc.notify(`已將 ${todo.text} 更新至 DB`);
      });
  }

}
