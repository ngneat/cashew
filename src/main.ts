import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { TodosComponent } from './app/todos/todos.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpCache, provideHttpCacheLocalStorageStrategy, withHttpCacheInterceptor } from '@ngneat/cashew';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([withHttpCacheInterceptor()])),
    provideHttpCache(),
    // provideHttpCacheLocalStorageStrategy(),
    provideRouter([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'todos',
        component: TodosComponent
      }
    ])
  ]
});
