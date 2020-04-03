import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucChuyennganhComponent } from './tuyendung-danhmuc-chuyennganh.component';

describe('TuyendungDanhmucChuyennganhComponent', () => {
  let component: TuyendungDanhmucChuyennganhComponent;
  let fixture: ComponentFixture<TuyendungDanhmucChuyennganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucChuyennganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucChuyennganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
