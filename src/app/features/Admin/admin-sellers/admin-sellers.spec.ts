import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSellersComponent } from './admin-sellers';

describe('AdminSeller', () => {
  let component: AdminSellersComponent;
  let fixture: ComponentFixture<AdminSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
