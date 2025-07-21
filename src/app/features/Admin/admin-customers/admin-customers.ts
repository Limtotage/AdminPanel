import { Component } from '@angular/core';
import { SharedImportsModule } from '../../../shared-imports-module';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-customers',
  imports: [SharedImportsModule],
  templateUrl: './admin-customers.html',
  styleUrl: '../admin.scss',
})
export class AdminCustomersComponent {
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
    this.loadCustomers();
  }

  ngOnInit(): void {
    this.refreshAll();
  }
  loadCart(id:number){
    this.router.navigate(['/admin','cart'],{
      queryParams:{customerId:id}
    })
  }

  loadCustomers() {
    this.http
      .get<any[]>('http://localhost:8080/api/customer')
      .subscribe((data) => ((this.customers = data), console.log(data)));
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
