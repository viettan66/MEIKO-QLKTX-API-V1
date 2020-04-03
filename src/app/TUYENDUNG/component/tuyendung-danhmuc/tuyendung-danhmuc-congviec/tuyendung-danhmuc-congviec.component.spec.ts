import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucCongviecComponent } from './tuyendung-danhmuc-congviec.component';

describe('TuyendungDanhmucCongviecComponent', () => {
  let component: TuyendungDanhmucCongviecComponent;
  let fixture: ComponentFixture<TuyendungDanhmucCongviecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucCongviecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucCongviecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
