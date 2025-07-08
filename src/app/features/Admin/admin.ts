import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  imports: [CommonModule],
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  users: any[] = [];
  pendingCategories: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
    this.loadPendingCategories();
  }

  loadProducts() {
    this.http
      .get<any[]>('http://localhost:8080/api/product')
      .subscribe((data) => (this.products = data));
  }

  loadUsers() {
    this.http
      .get<any[]>('http://localhost:8080/api/users')
      .subscribe((data) => (this.users = data));
  }

  loadPendingCategories() {
    this.http
      .get<any[]>('http://localhost:8080/api/admin/category/pending')
      .subscribe((data) => (this.pendingCategories = data));
  }

  deleteProduct(id: number) {
    this.http
      .delete(`http://localhost:8080/api/admin/product/${id}`)
      .subscribe(() => {
        alert('Ürün silindi');
        this.loadProducts();
      });
  }

  deleteUser(id: number) {
    this.http
      .delete(`http://localhost:8080/api/admin/user/${id}`)
      .subscribe(() => {
        alert('Kullanıcı silindi');
        this.loadUsers();
      });
  }

  approveCategory(id: number) {
    this.http
      .put(`http://localhost:8080/api/admin/category/approve/${id}`, {})
      .subscribe(() => {
        alert('Kategori onaylandı');
        this.loadPendingCategories();
      });
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
