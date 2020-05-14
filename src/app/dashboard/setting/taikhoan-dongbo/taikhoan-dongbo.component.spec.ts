import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaikhoanDongboComponent } from './taikhoan-dongbo.component';

describe('TaikhoanDongboComponent', () => {
  let component: TaikhoanDongboComponent;
  let fixture: ComponentFixture<TaikhoanDongboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaikhoanDongboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikhoanDongboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
