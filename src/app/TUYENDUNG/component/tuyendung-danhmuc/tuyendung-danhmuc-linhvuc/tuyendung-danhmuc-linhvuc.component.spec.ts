import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucLinhvucComponent } from './tuyendung-danhmuc-linhvuc.component';

describe('TuyendungDanhmucLinhvucComponent', () => {
  let component: TuyendungDanhmucLinhvucComponent;
  let fixture: ComponentFixture<TuyendungDanhmucLinhvucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucLinhvucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucLinhvucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
