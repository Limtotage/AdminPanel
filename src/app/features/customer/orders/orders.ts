import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../core/auth/auth';
import { Component, OnInit } from '@angular/core';
import { SharedImportsModule } from '../../../shared-imports-module';

@Component({
  selector: 'app-orders',
  imports: [SharedImportsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class OrdersComponent implements OnInit {
  currentUser: any;
  orders: any[] = [];

  constructor(private authservice: AuthService, private http: HttpClient) {}
  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('Giriş yapan kullanıcı:', user);
      this.loadOrderHistory();
    });
  }
  back(){
    location.href = '/customer';
  }
  loadOrderHistory() {
    this.http
      .get<any[]>(`http://localhost:8080/api/orders/${this.currentUser.id}`)
      .subscribe((data) => {
        console.log(data);
        this.orders = data;
      });
  }
}
