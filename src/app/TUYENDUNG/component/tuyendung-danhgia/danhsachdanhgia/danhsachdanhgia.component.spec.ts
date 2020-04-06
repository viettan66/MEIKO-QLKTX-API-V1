import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachdanhgiaComponent } from './danhsachdanhgia.component';

describe('DanhsachdanhgiaComponent', () => {
  let component: DanhsachdanhgiaComponent;
  let fixture: ComponentFixture<DanhsachdanhgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachdanhgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachdanhgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
