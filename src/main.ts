import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpCache, withHttpCacheInterceptor, withLocalStorage, withSessionStorage } from '@ngneat/cashew';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { TodosComponent } from './app/todos/todos.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([withHttpCacheInterceptor()])),
    provideHttpCache(
      {
        responseSerializer(value) {
          return structuredClone(value);
        }
      },
      withLocalStorage(),
      withSessionStorage()
    ),
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
