import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpCacheFacade } from '@ngneat/http-cache';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(private http: HttpClient, private h: HttpCacheFacade) { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/todos?hello=3').subscribe(res => {
      console.log(res);
    });
  }

}
