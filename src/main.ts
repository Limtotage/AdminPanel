import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './app/core/auth/jwt-interceptor';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(), // temel HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
});
