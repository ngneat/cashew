import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpCacheFacade, withCache } from '@ngneat/http-cache';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  constructor(private http: HttpClient, private h: HttpCacheFacade) {}

  ngOnInit() {
    const tenSec = 10000;

    this.http.get('https://jsonplaceholder.typicode.com/todos', withCache({ cache$: false })).subscribe(res => {
      console.log(res);
    });

    this.http.get('https://jsonplaceholder.typicode.com/todos', withCache({ id: 1 })).subscribe(res => {
      console.log(res);
    });

    this.http.get('https://jsonplaceholder.typicode.com/todos', withCache({ id: 2, ttl$: tenSec })).subscribe(res => {
      console.log(res);
    });
  }
}
