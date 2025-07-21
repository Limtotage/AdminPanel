import { Component } from '@angular/core';
import { SharedImportsModule } from '../../../shared-imports-module';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sellers',
  imports: [SharedImportsModule],
  templateUrl: './admin-sellers.html',
  styleUrl: '../admin.scss',
})
export class AdminSellersComponent {
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
    this.loadSellers();
  }

  ngOnInit(): void {
    this.refreshAll();
  }

  navProducts(id:number){
    this.router.navigate(['/admin' ,'sproducts'],{
      queryParams:{sellerId:id}})
  }

  loadSellers() {
    this.http
      .get<any[]>('http://localhost:8080/api/seller')
      .subscribe((data) => {
        console.log(data);
        this.sellers = data;
      });
  }

  deleteSeller(id: number) {
    this.http
      .delete(`http://localhost:8080/api/seller/admin/${id}`, {
        responseType: 'text',
      })
      .subscribe(() => {
        alert('Satıcı silindi');
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
