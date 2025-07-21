import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedImportsModule } from '../../../shared-imports-module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, SharedImportsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  currentUser: any;
  constructor(
    private authservice: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      expirationDate: ['', Validators.required],
      cvc: ['', [Validators.required, Validators.minLength(3)]],
      cardHolderName: ['', Validators.required],
    });
  }
  returnCustomer(){
    location.href = '/customer'
  }
  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  submitPayment() {
    if (this.paymentForm.invalid) return;

    this.http
      .post(`http://localhost:8080/api/payment/${this.currentUser.id}`, this.paymentForm.value)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Ödeme başarılı!', 'Kapat', { duration: 3000 });
          // yönlendirme veya form reset
        },
        error: () => {
          this.snackBar.open('Ödeme başarısız!', 'Kapat', { duration: 3000 });
        },
      });
  }
}
