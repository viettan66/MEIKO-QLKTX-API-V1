import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucQuyendanhgiaComponent } from './tuyendung-danhmuc-quyendanhgia.component';

describe('TuyendungDanhmucQuyendanhgiaComponent', () => {
  let component: TuyendungDanhmucQuyendanhgiaComponent;
  let fixture: ComponentFixture<TuyendungDanhmucQuyendanhgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucQuyendanhgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucQuyendanhgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
