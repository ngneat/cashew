import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheBucket, HttpCacheManager, withCache } from '@ngneat/http-cache';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  bucket = new CacheBucket();

  constructor(private http: HttpClient, private manager: HttpCacheManager) {}

  ngOnInit() {
    const tenSec = 10000;

    // this.http
    //   .get(
    //     'https://jsonplaceholder.typicode.com/todos',
    //     withCache({
    //       key$: 'netanel',
    //       ttl$: tenSec
    //     })
    //   )
    //   .subscribe(res => {
    //     console.log(res);
    //   });

    this.http.get('https://jsonplaceholder.typicode.com/todos', withCache({ bucket$: this.bucket })).subscribe(res => {
      console.log(res);
    });

    //
    // this.http.get('https://jsonplaceholder.typicode.com/todos', withCache({ id: 1 })).subscribe(res => {
    //   console.log(res);
    // });
    //
    // this.http.get('https://jsonplaceholder.typicode.com/todos', withCache({ id: 1 })).subscribe(res => {
    //   console.log(res);
    // });
    //
    // this.http.get('https://jsonplaceholder.typicode.com/todos', withCache({ id: 2, ttl$: tenSec })).subscribe(res => {
    //   console.log(res);
    // });
  }

  clear() {
    this.manager.delete(this.bucket);
  }
}
