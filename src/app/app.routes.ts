import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { AdminComponent } from './features/Admin/admin';
import { CustomerComponent } from './features/customer/customer';
import { SellerComponent } from './features/seller/seller';
import { UsersComponent } from './features/users/users';
import { AuthGuard } from './core/auth/auth-guard';
import { RoleGuard } from './services/role-guard';
import { RegisterComponent } from './features/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [RoleGuard],
    data: { role: 'CUSTOMER' },
  },
  {
    path: 'seller',
    component: SellerComponent,
    canActivate: [RoleGuard],
    data: { role: 'SELLER' },
  },
];
