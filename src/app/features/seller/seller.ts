import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth';
import { MatSelectModule } from '@angular/material/select';
import { SharedImportsModule } from '../../shared-imports-module';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [SharedImportsModule],
  styleUrls: ['./seller.scss'],
  templateUrl: './seller.html',
})
export class SellerComponent implements OnInit {
  selectedSortOption: string = '';
  allProducts: any[] = [];
  myProducts: any[] = [];
  categories: any[] = [];
  newProduct = {
    name: '',
    categoryName: '',
    productStock: 0,
    price: 0.0,
  };
  updatedProduct = {
    name: '',
    categoryName: '',
    productStock: 0,
    price: 0.0,
  };
  newCategory = {
    name: '',
    isApproved: false,
    productsIds: [],
  };
  FilteredcategoryName: String = '';
  FilteredMycategoryName: String = '';
  selectedProductID = 0;
  currentUser: any;
  showNewProductForm = false;
  showUpdateProductForm = false;
  showNewCategoryForm = false;

  constructor(
    private authservice: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  refreshAll() {
    this.loadAllProducts();
    this.loadMyProducts();
    this.loadCategories();
    this.loadProductsByCategory();
    this.loadMyProductsByCategory();
  }
  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      this.refreshAll();
    });
  }
  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
  //Products
  loadAllProducts() {
    this.http
      .get<any[]>('http://localhost:8080/api/product')
      .subscribe((data) => (this.allProducts = data,console.log(data)));
  }

  loadMyProducts() {
    this.http
      .get<any[]>(
        `http://localhost:8080/api/product/seller/${this.currentUser.id}`
      )
      .subscribe((data) => (this.myProducts = data));
  }
  loadProductsByCategory() {
    if (this.FilteredcategoryName === '') {
      this.loadAllProducts();
      return;
    }
    this.http
      .get<any[]>(
        `http://localhost:8080/api/product/category/${this.FilteredcategoryName}`
      )
      .subscribe((data) => (this.allProducts = data ));
  }
  loadMyProductsByCategory() {
    if (this.FilteredMycategoryName === '') {
      this.loadMyProducts();
      return;
    }
    this.http
      .get<any[]>(
        `http://localhost:8080/api/product/seller/${this.currentUser.id}`
      )
      .subscribe((data) => {
        this.myProducts = data.filter(
          (p) => p.categoryName === this.FilteredMycategoryName
        );
      });
  }
  clearArea() {
    this.newProduct.categoryName = '';
    this.newProduct.name = '';
    this.newProduct.productStock = 0;
    this.newProduct.price = 0.0;
  }

  //categories
  loadCategories() {
    this.http
      .get<any[]>('http://localhost:8080/api/category/approved')
      .subscribe((data) => (this.categories = data));
  }
  selectProduct(product: any) {
    this.updatedProduct.name = product.name;
    this.updatedProduct.price = product.price;
    this.updatedProduct.productStock = product.productStock;
    this.updatedProduct.categoryName = product.categoryName;
    this.selectedProductID = product.id;
    this.showUpdateProductForm = !this.showUpdateProductForm;
  }

  createProduct() {
    this.http
      .post('http://localhost:8080/api/product/seller', this.newProduct)
      .subscribe(() => {
        alert('Ürün eklendi!');
        this.showNewProductForm = false;
        this.refreshAll();
        this.clearArea();
      });
  }
  createCategory() {
    this.http
      .post('http://localhost:8080/api/category', this.newCategory)
      .subscribe(() => {
        alert('Kategori Başarıyla eklendi. Yönetici Onayı Bekleniyor.');
        this.showNewCategoryForm = false;
        this.refreshAll();
      });
  }
  deleteProduct() {
    this.http
      .delete(`http://localhost:8080/api/product/${this.selectedProductID}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        alert('Ürün Silindi!');
        this.showUpdateProductForm = false;
        this.refreshAll();
      });
  }
  getCategoryName(id: number): string {
    const category = this.categories.find((c) => c.id === id);
    return category ? category.name : 'UnCategorized!';
  }
  updateProduct() {
    this.http
      .put(
        `http://localhost:8080/api/product/${this.selectedProductID}`,
        this.updatedProduct
      )
      .subscribe(() => {
        alert('Ürün Düzenlendi.');
        this.showUpdateProductForm = false;
        this.refreshAll();
      });
  }

  deleteUser() {
    const token = localStorage.getItem('token');
    if (confirm('Hesabınızı silmek istediğinize emin misiniz?')) {
      this.http
        .delete(`http://localhost:8080/api/seller/${this.currentUser.id}`, {
          responseType: 'text',
        })
        .subscribe(() => {
          localStorage.removeItem('token');
          alert('Hesabınız silindi');
          this.router.navigate(['/login']);
        });
    }
  }
  sortProducts() {
    switch (this.selectedSortOption) {
      case 'price-asc':
        this.allProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.allProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.allProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.allProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'sales-asc':
        this.allProducts.sort((a, b) => a.totalSales - b.totalSales);
        break;
      case 'sales-desc':
        this.allProducts.sort((a, b) => b.totalSales - a.totalSales);
        break;
    }
  }
}
