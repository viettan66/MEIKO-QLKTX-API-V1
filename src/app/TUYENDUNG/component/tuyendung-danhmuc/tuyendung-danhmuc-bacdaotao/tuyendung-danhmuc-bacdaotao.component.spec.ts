import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucBacdaotaoComponent } from './tuyendung-danhmuc-bacdaotao.component';

describe('TuyendungDanhmucBacdaotaoComponent', () => {
  let component: TuyendungDanhmucBacdaotaoComponent;
  let fixture: ComponentFixture<TuyendungDanhmucBacdaotaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucBacdaotaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucBacdaotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
