import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucDiadiemphongvanComponent } from './tuyendung-danhmuc-diadiemphongvan.component';

describe('TuyendungDanhmucDiadiemphongvanComponent', () => {
  let component: TuyendungDanhmucDiadiemphongvanComponent;
  let fixture: ComponentFixture<TuyendungDanhmucDiadiemphongvanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucDiadiemphongvanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucDiadiemphongvanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
