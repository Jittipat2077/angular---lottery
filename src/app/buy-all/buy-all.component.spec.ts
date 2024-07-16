import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAllComponent } from './buy-all.component';

describe('BuyAllComponent', () => {
  let component: BuyAllComponent;
  let fixture: ComponentFixture<BuyAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyAllComponent]
    });
    fixture = TestBed.createComponent(BuyAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
