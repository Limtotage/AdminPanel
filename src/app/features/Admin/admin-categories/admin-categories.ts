import { Component } from '@angular/core';
import { SharedImportsModule } from '../../../shared-imports-module';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-categories',
  imports: [
    SharedImportsModule,
  ],
  templateUrl: './admin-categories.html',
  styleUrl: '../admin.scss',
})
export class AdminCategoriesComponent {
   displayedColumns: string[] = [
    'id',
    'fullName',
    'username',
    'products',
    'actions',
  ];
  products: any[] = [];
  sellers: any[] = [];
  customers: any[] = [];
  categories: any[] = [];
  pendingCategory: any[] = [];

  ApprovedDTO = {
    isApproved: true,
  };

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
  refreshAll() {
    this.loadUnapprovedCategory();
    this.loadCategories();
  }

  ngOnInit(): void {
    this.refreshAll();
  }

  loadUnapprovedCategory() {
    this.http
      .get<any[]>('http://localhost:8080/api/category/unapproved')
      .subscribe((data) => (this.pendingCategory = data));
  }
  loadCategories() {
    this.http
      .get<any[]>('http://localhost:8080/api/category')
      .subscribe((data) => ((this.categories = data)));
  }
  deleteCategory(id: number) {
    this.http
      .delete(`http://localhost:8080/api/category/${id}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        alert('Kategori Silindi.');
        this.refreshAll();
      });
  }
  approveCategory(id: number) {
    this.http
      .put(
        `http://localhost:8080/api/category/unapproved/${id}`,
        this.ApprovedDTO
      )
      .subscribe(() => {
        alert('Kategori onaylandı');
        this.refreshAll();
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
