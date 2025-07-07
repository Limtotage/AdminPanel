import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth';
import { parseJwt } from '../../core/utils/Jwt.util';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // << Bunu ekle



// Angular Material modülleri
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true, // << standalone true olmalı
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authservice: AuthService, private router: Router) {}

  login() {
    this.authservice
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          const payload = parseJwt(res.token);
          const rawRoles: string[] = payload.roles;
          console.log('Token payload:', payload);// Debugging için payload'u konsola yazdır
          console.log('Roles:', payload.roles);// Debugging için roller
          const roles = rawRoles.map(r => r.replace('ROLE_', ''));
          if (roles.includes('ADMIN')) {
            this.router.navigate(['/admin']);
          } else if (roles.includes('CUSTOMER')) {
            this.router.navigate(['/customer']);
          } else if (roles.includes('SELLER')) {
            this.router.navigate(['/seller']);
          } else {
            this.router.navigate(['/']);
            alert('Yetkiniz bulunmuyor!');
          }
        },
        error: () => alert('Giriş başarısız!'),
      });
  }
}
