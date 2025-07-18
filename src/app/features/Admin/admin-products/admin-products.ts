import { Component } from '@angular/core';
import { SharedImportsModule } from '../../../shared-imports-module';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule,SharedImportsModule],
  templateUrl: './admin-products.html',
  styleUrl: '../admin.scss',
})
export class AdminProductsComponent {
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
    this.loadProducts();
    this.loadSellers();
    this.loadCustomers();
    this.loadUnapprovedCategory();
    this.loadCategories();
  }

  ngOnInit(): void {
    this.refreshAll();
  }

  loadProducts() {
    this.http
      .get<any[]>('http://localhost:8080/api/product')
      .subscribe((data) => (this.products = data));
  }

  loadSellers() {
    this.http
      .get<any[]>('http://localhost:8080/api/seller')
      .subscribe((data) => {
        this.sellers = data;
      });
  }
  loadCustomers() {
    this.http
      .get<any[]>('http://localhost:8080/api/customer')
      .subscribe((data) => ((this.customers = data), console.log(data)));
  }

  loadUnapprovedCategory() {
    this.http
      .get<any[]>('http://localhost:8080/api/category/unapproved')
      .subscribe((data) => (this.pendingCategory = data));
  }
  loadCategories() {
    this.http
      .get<any[]>('http://localhost:8080/api/category')
      .subscribe((data) => (this.categories = data));
  }

  deleteProduct(id: number) {
    this.http
      .delete(`http://localhost:8080/api/product/${id}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        alert('Ürün silindi');
        this.refreshAll();
      });
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

  deleteSeller(id: number) {
    this.http
      .delete(`http://localhost:8080/api/seller/admin/${id}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        alert('Satıcı silindi');
        this.refreshAll();
      });
  }
  deleteCustomer(id: number) {
    this.http
      .delete(`http://localhost:8080/api/customer/admin/${id}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        alert('Müşteri silindi');
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
