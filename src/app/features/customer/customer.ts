import { AuthService } from '../../core/auth/auth';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './customer.html',
})
export class CustomerComponent implements OnInit {
  products: any[] = [];
  currentUser: any;
  selectedProductIds: Set<number> = new Set();

  constructor(private authservice: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('Giriş yapan kullanıcı:', user);
    });
    this.loadProducts();
  }
  loadProducts() {
    this.http
      .get<any[]>('http://localhost:8080/api/product')
      .subscribe((data) => (this.products = data));
  }
  toggleProduct(id: number, checked: boolean) {
    if (checked) this.selectedProductIds.add(id);
    else this.selectedProductIds.delete(id);
  }
  submitSelectedProducts() {
    const selectedIds = Array.from(this.selectedProductIds);
    const updatedCustomer = {
      fullname: this.currentUser.fullname,
      username: this.currentUser.username,
      products: selectedIds,
    };
    console.log(selectedIds);
    this.http
      .put(
        `http://localhost:8080/api/customer/${this.currentUser.id}`,
        updatedCustomer
      )
      .subscribe(() => alert('Seçili Ürünler Eklenmiştir.'));
  }
  deleteUser() {
    if (confirm('Hesabınızı silmek istediğinize emin misiniz?')) {
      this.http
        .delete(`http://localhost:8080/api/customer/${this.currentUser.id}`, {
          responseType: `text`,
        })
        .subscribe(() => {
          localStorage.removeItem('token');
          alert('Hesabınızı silindi');
          location.href = '/login';
        });
    }
  }
  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
}
