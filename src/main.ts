import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {
  provideHttpCache,
  withHttpCacheInterceptor
} from '../projects/ngneat/cashew/src/lib/cache-interceptor.providers';
import { withLocalStorage } from '../projects/ngneat/cashew/src/lib/local-storage/local-storage-providers';
import { withSessionStorage } from '../projects/ngneat/cashew/src/lib/session-storage/session-storage-providers';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { TodosComponent } from './app/todos/todos.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([withHttpCacheInterceptor()])),
    provideHttpCache(withLocalStorage(), withSessionStorage()),
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
