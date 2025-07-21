import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SharedImportsModule } from '../../shared-imports-module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  imports: [
    RouterModule,
    SharedImportsModule,
  ],
  styleUrls: ['./admin.scss'],
})
export class AdminComponent implements OnInit {


  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }

  ngOnInit(): void {
  }


  deleteAccount() {
    const token = localStorage.getItem('token');
    if (confirm('Hesabınızı silmek istediğinize emin misiniz?')) {
      this.http
        .delete('http://localhost:8080/api/admin/delete', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(() => {
          localStorage.removeItem('token');
          alert('Hesabınız silindi');
          this.router.navigate(['/login']);
        });
    }
  }
}
