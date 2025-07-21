import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mycart } from './mycart';

describe('Mycart', () => {
  let component: Mycart;
  let fixture: ComponentFixture<Mycart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mycart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mycart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
