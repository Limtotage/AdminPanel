import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JwtInterceptor } from './core/auth/jwt-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers:[{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  }]
})
export class App {
  protected title = 'admin-panel';
}
