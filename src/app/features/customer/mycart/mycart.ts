import { Component, OnInit } from '@angular/core';
import { SharedImportsModule } from '../../../shared-imports-module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/auth/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mycart',
  imports: [SharedImportsModule],
  templateUrl: './mycart.html',
  styleUrl: './mycart.scss',
})
export class MycartComponent implements OnInit {
  myCartItems: any[] = [];
  myCart: any = [];
  currentUser: any;
  categories: any[] = [];
  FilteredProductCategoryName: String = '';
  FilteredOwnProductCategoryName: String = '';

  constructor(
    private snackBar: MatSnackBar,
    private authservice: AuthService,
    private http: HttpClient
  ) {}
  refreshProducts() {
    this.loadCartItems();
    this.loadCategories();
    this.loadCart();
  }
  refreshCart() {
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

  loadCart() {
    this.http
      .get<any[]>(`http://localhost:8080/api/cart/${this.currentUser.id}`)
      .subscribe((data) => ((this.myCart = data), console.log(data)));
  }
  toCustomer() {
    location.href = '/customer';
  }
  loadCartItems() {
    this.http
      .get<any[]>(`http://localhost:8080/api/cart-items/${this.currentUser.id}`)
      .subscribe((data) => {
        console.log(data);
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

  loadOwnCartItemsByCategory() {
    if (this.FilteredOwnProductCategoryName === '') {
      this.loadCartItems();
      return;
    }

    this.http
      .get<any[]>(`http://localhost:8080/api/cart-items/${this.currentUser.id}`)
      .subscribe((data) => {
        this.myCartItems = data.filter(
          (p) => p.categoryName === this.FilteredOwnProductCategoryName
        );
      });
  }
  clearCart() {
    this.http
      .delete(`http://localhost:8080/api/cart/clear/${this.currentUser.id}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        alert('Sepet Temizlendi');
        this.refreshProducts();
        this.refreshCart();
      });
  }
  confirmCart() {
    location.href = '/payment';
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
      .subscribe({
        next: () => {
          console.log('Artırıldı'), this.refreshCart();
        },
        error: (err) => {
          const msg = err.status === 400 ? err.error : 'Bir hata oluştu.';
          this.snackBar.open(msg, 'Kapat', { duration: 3000 });
        },
      });
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
