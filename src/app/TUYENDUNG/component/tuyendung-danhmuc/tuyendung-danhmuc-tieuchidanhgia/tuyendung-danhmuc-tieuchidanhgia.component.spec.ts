import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucTieuchidanhgiaComponent } from './tuyendung-danhmuc-tieuchidanhgia.component';

describe('TuyendungDanhmucTieuchidanhgiaComponent', () => {
  let component: TuyendungDanhmucTieuchidanhgiaComponent;
  let fixture: ComponentFixture<TuyendungDanhmucTieuchidanhgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucTieuchidanhgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucTieuchidanhgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
