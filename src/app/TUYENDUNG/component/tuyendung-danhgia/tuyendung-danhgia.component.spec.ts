import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhgiaComponent } from './tuyendung-danhgia.component';

describe('TuyendungDanhgiaComponent', () => {
  let component: TuyendungDanhgiaComponent;
  let fixture: ComponentFixture<TuyendungDanhgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
