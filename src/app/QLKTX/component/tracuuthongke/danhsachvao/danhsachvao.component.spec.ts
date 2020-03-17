import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachvaoComponent } from './danhsachvao.component';

describe('DanhsachvaoComponent', () => {
  let component: DanhsachvaoComponent;
  let fixture: ComponentFixture<DanhsachvaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachvaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachvaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
