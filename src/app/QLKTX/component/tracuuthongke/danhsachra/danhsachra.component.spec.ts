import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachraComponent } from './danhsachra.component';

describe('DanhsachraComponent', () => {
  let component: DanhsachraComponent;
  let fixture: ComponentFixture<DanhsachraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
