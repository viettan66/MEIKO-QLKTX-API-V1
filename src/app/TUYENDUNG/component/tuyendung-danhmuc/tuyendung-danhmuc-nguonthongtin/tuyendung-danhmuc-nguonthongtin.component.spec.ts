import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucNguonthongtinComponent } from './tuyendung-danhmuc-nguonthongtin.component';

describe('TuyendungDanhmucNguonthongtinComponent', () => {
  let component: TuyendungDanhmucNguonthongtinComponent;
  let fixture: ComponentFixture<TuyendungDanhmucNguonthongtinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucNguonthongtinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucNguonthongtinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
