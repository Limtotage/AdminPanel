import { AuthService } from '../../core/auth/auth';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './customer.html',
})
export class CustomerComponent implements OnInit {
  products: any[] = [];
  myProducts: any[] = [];
  currentUser: any;
  categories: any[] = [];
  selectedProductIds: Set<number> = new Set();
  UnselectProductIds: Set<number> = new Set();
  FilteredProductCategoryName: String = '';
  FilteredOwnProductCategoryName: String = '';

  constructor(private authservice: AuthService, private http: HttpClient) {}
  refreshProducts() {
    this.loadProducts();
    this.loadOwnProducts();
    this.loadCategories();
    this.loadProductsByCategory();
  }

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('Giriş yapan kullanıcı:', user);
      this.refreshProducts();
    });
  }
  loadCategories() {
    this.http
      .get<any[]>('http://localhost:8080/api/category/approved')
      .subscribe(
        (data) => ((this.categories = data))
      );
  }
  loadProducts() {
    this.http
      .get<any[]>('http://localhost:8080/api/product')
      .subscribe((data) => (this.products = data));
  }
  loadCardByCustomer(){
    this.http
        .get<any[]>(`http://localhost:8080/api/cart/${this.currentUser.id}`)
        .subscribe((data)=>(console.log(data)));
  }
  loadOwnProducts() {
    // this.http
    //   .get<any[]>(
    //     `http://localhost:8080/api/product/customer/${this.currentUser.id}`
    //   )
    //   .subscribe((data) => (this.myProducts = data));
  }
  loadProductsByCategory() {
    if (this.FilteredProductCategoryName === '') {
      this.loadProducts();
      return;
    }
    this.http
      .get<any[]>(
        `http://localhost:8080/api/product/category/${this.FilteredProductCategoryName}`
      )
      .subscribe((data) => (this.products = data));
  }
  loadOwnProductsByCategory() {
    // if (this.FilteredOwnProductCategoryName === '') {
    //   this.loadOwnProducts();
    //   return;
    // }
    // this.http
    //   .get<any[]>(
    //     `http://localhost:8080/api/product/customer/${this.currentUser.id}`
    //   )
    //   .subscribe((data) => {
    //     this.myProducts = data.filter(
    //       p=>p.categoryName === this.FilteredOwnProductCategoryName
    //     )
    //   });
  }
  toggleProduct(id: number, checked: boolean) {
    if (checked) this.selectedProductIds.add(id);
    else this.selectedProductIds.delete(id);
  }
  untoggleProduct(id: number, checked: boolean) {
    if (checked) this.UnselectProductIds.add(id);
    else this.UnselectProductIds.delete(id);
  }
  submitSelectedProducts() {
    // const selectedIds = Array.from(this.selectedProductIds);
    // console.log(selectedIds);
    // this.http
    //   .put(
    //     `http://localhost:8080/api/customer/addProduct/${this.currentUser.id}`,
    //     selectedIds
    //   )
    //   .subscribe(() => {
    //     alert('Seçili Ürünler Eklenmiştir.');
    //     this.refreshProducts();
    //     this.selectedProductIds = new Set();
    //   });
  }
  removeProductFromList() {
    // const selectedIds = Array.from(this.UnselectProductIds);
    // console.log('Removed Ids: ' + selectedIds);
    // this.http
    //   .put(
    //     `http://localhost:8080/api/customer/removeProduct/${this.currentUser.id}`,
    //     selectedIds
    //   )
    //   .subscribe(() => {
    //     alert('Seçili Ürünler Kaldırılmıştır.');
    //     this.refreshProducts();
    //     this.UnselectProductIds = new Set();
    //   });
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
