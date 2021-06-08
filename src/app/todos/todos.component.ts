import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheBucket, HttpCacheManager } from '@ngneat/cashew';
import { withCache } from '../../../projects/ngneat/cashew/src/lib/cacheContext';
import { count } from 'rxjs/operators';

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
      .get('https://jsonplaceholder.typicode.com/todos', {
        params: { id },
        context: withCache({
          bucket: this.todosBucket
        })
      })
      .subscribe(res => {
        console.log(`Todo ${id}`, res);
      });
  }

  count = 1;
  cachePredicate() {
    this.count++;

    this.http
      .get('https://jsonplaceholder.typicode.com/todos', {
        params: {
          from: this.count,
          to: Math.random()
        },
        context: withCache({
          key: 'todos',
          clearCachePredicate(prev, current) {
            if(Number(prev?.params.get('from')) > 3) {
              return true;
            }

            return false;
          }
        })
      })
      .subscribe(res => {
        console.log(`cachePredicate`, res);
      });
  }


  loadTodos() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos', {
        context: withCache()
      })
      .subscribe(res => {
        console.log(`Todos`, res);
      });
  }

  loadSimultaneous() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos', {
        context: withCache({
          key: 'Simultaneous'
        })
      })
      .subscribe(res => {
        console.log(`Todos Simultaneous`, res);
      });

    this.http
      .get('https://jsonplaceholder.typicode.com/todos', {
        context: withCache({
          key: 'Simultaneous'
        })
      })
      .subscribe(res => {
        console.log(`Todos Simultaneous`, res);
      });
  }

  loadTodoFour() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos', {
        params: { id: 4 },
        context: withCache({ ttl: 10000 })
      })
      .subscribe(res => {
        console.log(`Todo 4`, res);
      });
  }

  loadCustomKey() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos', {
        context: withCache({
          key: 'allTodos'
        })
      })
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
