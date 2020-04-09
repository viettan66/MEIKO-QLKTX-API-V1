import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtuyendungComponent } from './danhsachtuyendung.component';

describe('DanhsachtuyendungComponent', () => {
  let component: DanhsachtuyendungComponent;
  let fixture: ComponentFixture<DanhsachtuyendungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachtuyendungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtuyendungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
