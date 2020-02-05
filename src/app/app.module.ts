import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import { withHttpCacheLocalStorage } from '../../projects/ngneat/cashew/src/lib/withHttpCacheLocalStorage';

@NgModule({
  declarations: [AppComponent, HomeComponent, TodosComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HttpCacheInterceptorModule.forRoot()],
  bootstrap: [AppComponent],
  providers: [withHttpCacheLocalStorage]
})
export class AppModule {}
