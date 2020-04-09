import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhgiacuatoiComponent } from './tuyendung-danhgiacuatoi.component';

describe('TuyendungDanhgiacuatoiComponent', () => {
  let component: TuyendungDanhgiacuatoiComponent;
  let fixture: ComponentFixture<TuyendungDanhgiacuatoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhgiacuatoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhgiacuatoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
