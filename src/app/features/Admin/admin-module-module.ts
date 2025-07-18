import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCustomersComponent } from './admin-customers/admin-customers';
import { AdminProductsComponent } from './admin-products/admin-products';
import { AdminCategoriesComponent } from './admin-categories/admin-categories';
import { AdminSellersComponent } from './admin-sellers/admin-sellers';
import { AdminRoutingModule } from './admin-routing-module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatCardModule,
    AdminCustomersComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    AdminSellersComponent,
  ],
})
export class AdminModule {}
