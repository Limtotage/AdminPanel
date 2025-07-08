import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './seller.html',
})
export class SellerComponent implements OnInit {
  allProducts: any[] = [];
  myProducts: any[] = [];
  newProduct = {
    name: '',
    category: '',
    stock: 0,
    price: 0,
  };
  showNewProductForm = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadAllProducts();
    this.loadMyProducts();
  }
  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
  loadAllProducts() {
    this.http
      .get<any[]>('http://localhost:8080/api/product')
      .subscribe((data) => (this.allProducts = data));
  }

  loadMyProducts() {
    this.http
      .get<any[]>('http://localhost:8080/api/seller/products')
      .subscribe((data) => (this.myProducts = data));
  }

  createProduct() {
    this.http
      .post('http://localhost:8080/api/seller/product', this.newProduct)
      .subscribe(() => {
        alert('Ürün eklendi!');
        this.showNewProductForm = false;
        this.loadMyProducts();
      });
  }

  deleteUser() {
    const token = localStorage.getItem('token');
    if (confirm('Hesabınızı silmek istediğinize emin misiniz?')) {
      this.http
        .delete('http://localhost:8080/api/seller/delete', {
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
