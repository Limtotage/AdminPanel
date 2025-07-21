import { Component, OnInit } from '@angular/core';
import { SharedImportsModule } from '../../../../shared-imports-module';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customers-cart',
  imports: [SharedImportsModule],
  templateUrl: './customers-cart.html',
  styleUrl: './customers-cart.scss',
})
export class CustomersCartComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'username',
    'products',
    'actions',
  ];
  currentUserId: number = 0;
  CartItems: any[] = [];
  orders:any[]=[];
  myCart:any[]=[];

  ApprovedDTO = {
    isApproved: true,
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  loadCart() {
    this.http
      .get<any[]>(`http://localhost:8080/api/cart/${this.currentUserId}`)
      .subscribe((data) => ((this.myCart = data), console.log(data)));
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentUserId = params['customerId'];
      console.log(this.currentUserId +"params: "+ params);
      this.loadCart();
      this.loadCartItems();
      this.loadOrderHistory();
    });

  }
  back() {
    location.href = '/admin/customers';
  }
  refreshAll() {}
  loadCartItems() {
    this.http
      .get<any[]>(`http://localhost:8080/api/cart-items/${this.currentUserId}`)
      .subscribe((data) => {
        this.CartItems = data.sort((a, b) => a.id - b.id);
      });
  }
  loadOrderHistory(){
    this.http
        .get<any[]>(`http://localhost:8080/api/orders/${this.currentUserId}`)
        .subscribe((data)=>{
          console.log(data);
          this.orders=data;
        })
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
