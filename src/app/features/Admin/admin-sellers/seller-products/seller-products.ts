import { Component, OnInit } from '@angular/core';
import { SharedImportsModule } from '../../../../shared-imports-module';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-seller-products',
  imports: [SharedImportsModule],
  styleUrls:['./../../admin.scss'],
  templateUrl: './seller-products.html',
})
export class SellerProductsComponent implements OnInit{

  currentUserId:number=0;
  myProducts:any[]=[];
  constructor(private http:HttpClient ,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.currentUserId=params['sellerId'];
      this.loadMyProducts();
    })
  }

  loadMyProducts() {
    this.http
      .get<any[]>(
        `http://localhost:8080/api/product/seller/${this.currentUserId}`
      )
      .subscribe((data) => (this.myProducts = data));
  }
}
