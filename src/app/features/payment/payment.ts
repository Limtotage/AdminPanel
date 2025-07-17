import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class PaymentComponent implements OnInit {
  currentUser: any;
  paymentData = {
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
  };

  message = '';
  totalPaid = 0;
  paymentDate = '';

  constructor(private authservice: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('Giriş yapan kullanıcı:', user);
    });
  }
  submitPayment() {
    const customerId = 1; // Giriş yapan kullanıcıya göre dinamik yaparsın
    this.http
      .post<any>(
        `http://localhost:8080/api/payment/${this.currentUser.id}`,
        this.paymentData
      )
      .subscribe({
        next: (res) => {
          this.message = res.message;
          this.totalPaid = res.totalPaid;
          this.paymentDate = res.paymentDate;
        },
        error: (err) => {
          this.message = 'Ödeme başarısız: ' + err.error;
        },
      });
  }
}
