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
  myCartItems: any[] = [];
  myCart:any=[];
  currentUser: any;
  categories: any[] = [];
  selectedProduct = {
    productId: 0,
    quantity: 0,
  };
  UnselectProductIds: Set<number> = new Set();
  FilteredProductCategoryName: String = '';
  FilteredOwnProductCategoryName: String = '';

  constructor(private authservice: AuthService, private http: HttpClient) {}
  refreshProducts() {
    this.loadProducts();
    this.loadCartItems();
    this.loadCategories();
    this.loadProductsByCategory();
    this.loadCart();
  }
  refreshCart(){
    this.loadCart();
    this.loadCartItems();
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
      .subscribe((data) => (this.categories = data));
  }
  untoggleProduct() {}
  loadProducts() {
    this.http
      .get<any[]>('http://localhost:8080/api/product')
      .subscribe(
        (data) => (this.products = data.map((p) => ({ ...p, quantity: 1 })))
      );
  }
  loadCart() {
    this.http
      .get<any[]>(`http://localhost:8080/api/cart/${this.currentUser.id}`)
      .subscribe((data) => (this.myCart=data , console.log(data)));
  }
  loadCartItems() {
    this.http
      .get<any[]>(`http://localhost:8080/api/cart-items/${this.currentUser.id}`)
      .subscribe((data) => {
        this.myCartItems = data.sort((a, b) => a.id - b.id);
      });
  }
  removeItemFromCard(item: any) {
    this.http
      .delete(`http://localhost:8080/api/cart-items/remove/${item.id}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        this.refreshCart();
        alert('Item Removed from Cart.');
      });
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
  addToCart(product: any) {
    this.selectedProduct.quantity = product.quantity;
    this.selectedProduct.productId = product.id;
    this.http
      .post(
        `http://localhost:8080/api/cart/add/${this.currentUser.id}`,
        this.selectedProduct
      )
      .subscribe(() => {
        alert('Seçili Ürün Sepete Eklenmiştir.');
        this.refreshProducts();
      });
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
  decreaseQuantity(product: any) {
    if (product.quantity > 1) product.quantity -= 1;
  }
  increaseQuantity(product: any) {
    product.quantity += 1;
  }
  decreaseQuantityfromCart(item: any) {
    if (item.quantity > 1) {
      this.http
        .put(`http://localhost:8080/api/cart-items/decrease/${item.id}`, null)
        .subscribe(() => this.refreshCart());
    }
  }
  increaseQuantityfromCart(item: any) {
    this.http
      .put(`http://localhost:8080/api/cart-items/increase/${item.id}`, null)
      .subscribe(() => this.refreshCart());
  }
  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
  getStockColor(status: string): string {
    switch (status) {
      case 'IN_STOCK':
        return 'green';
      case 'LOW_STOCK':
        return '#cf7200ff';
      case 'OUT_OF_STOCK':
        return 'red';
      default:
        return 'black'; // bilinmeyen durumlar için
    }
  }
}
