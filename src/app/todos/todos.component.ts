import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheBucket, HttpCacheManager, withCache } from '@ngneat/http-cache';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  todosBucket = new CacheBucket();

  constructor(private http: HttpClient, private manager: HttpCacheManager) {}

  getById(id: number) {
    this.http
      .get(
        'https://jsonplaceholder.typicode.com/todos',
        withCache({
          id,
          bucket$: this.todosBucket
        })
      )
      .subscribe(res => {
        console.log(`Todo ${id}`, res);
      });
  }

  loadTodos() {
    this.http.get('https://jsonplaceholder.typicode.com/todos', withCache()).subscribe(res => {
      console.log(`Todos`, res);
    });
  }

  loadTodoFour() {
    this.http
      .get(
        'https://jsonplaceholder.typicode.com/todos',
        withCache({
          id: 4,
          ttl$: 10000
        })
      )
      .subscribe(res => {
        console.log(`Todo 4`, res);
      });
  }

  loadCustomKey() {
    this.http
      .get(
        'https://jsonplaceholder.typicode.com/todos',
        withCache({
          key$: 'allTodos'
        })
      )
      .subscribe(res => {
        console.log(`allTodos`, res);
      });
  }

  clearTodosCache() {
    this.manager.delete(this.todosBucket);
  }

  clearCache() {
    this.manager.delete();
  }

  addTodoFive() {
    const response = { id: 5 };
    this.manager.set(`https://jsonplaceholder.typicode.com/todos?id=5`, response);
  }
}
