import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCart } from './customers-cart';

describe('CustomersCart', () => {
  let component: CustomersCart;
  let fixture: ComponentFixture<CustomersCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
