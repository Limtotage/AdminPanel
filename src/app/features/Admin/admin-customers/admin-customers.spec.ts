import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomersComponent } from './admin-customers';

describe('AdminCustomer', () => {
  let component: AdminCustomersComponent;
  let fixture: ComponentFixture<AdminCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
