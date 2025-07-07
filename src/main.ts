import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './app/core/auth/jwt-interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(), // bu böyle kalacak
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS, // klasik yöntemle ekle
      useClass: JwtInterceptor,
      multi: true
    }
  ]
});
