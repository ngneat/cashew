import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { HttpCacheInterceptorModule } from '@ngneat/http-cache';

@NgModule({
  declarations: [AppComponent, HomeComponent, TodosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot({
      ttl: {
        default: 10000
      },
      strategy: 'implicit'
    })
    // HttpCacheInterceptorModule.forRoot({
    //   ttl: {
    //     default: 60,
    //     custom: {
    //       'https://jsonplaceholder.typicode.com/todos': 120
    //     }
    //   }
    // })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
