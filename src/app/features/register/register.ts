import { AuthService } from '../../core/auth/auth';
import { parseJwt } from '../../core/utils/Jwt.util';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule} from '@angular/material/radio';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './register.html',
})
export class RegisterComponent {
  fullname = '';
  username = '';
  password = '';
  role = 'CUSTOMER';
  constructor(private http:HttpClient, private router:Router) {}

  register(){
    const body = {
      fullname:this.fullname,
      username:this.username,
      password:this.password,
      roles:[this.role]
    };
    console.log('Seçilen rol:', this.role);
    this.http.post('http://localhost:8080/api/auth/register',body).subscribe({
      next:()=>{
        alert("Kayıt Başarılı! Giriş Sayfasına yönlendiriliyorsunuz.");
        this.router.navigate(['/login']);
      },
      error: () => alert('Kayıt başarısız!')
    })
  }
}
