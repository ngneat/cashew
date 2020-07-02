import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { HttpCacheInterceptorModule, useHttpCacheLocalStorage } from '@ngneat/cashew';

@NgModule({
  declarations: [AppComponent, HomeComponent, TodosComponent],
  // providers: [useHttpCacheLocalStorage],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HttpCacheInterceptorModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {}
