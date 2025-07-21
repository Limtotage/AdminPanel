import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoriesComponent } from './admin-categories/admin-categories';
import { AdminProductsComponent } from './admin-products/admin-products';
import { AdminCustomersComponent } from './admin-customers/admin-customers';
import { AdminSellersComponent } from './admin-sellers/admin-sellers';
import { AdminComponent } from './admin';
import { CustomersCartComponent } from './admin-customers/customers-cart/customers-cart';
import { SellerProductsComponent } from './admin-sellers/seller-products/seller-products';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'customers', component: AdminCustomersComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'sellers', component: AdminSellersComponent },
      { path: 'sproducts', component: SellerProductsComponent },
      { path: 'cart', component: CustomersCartComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
