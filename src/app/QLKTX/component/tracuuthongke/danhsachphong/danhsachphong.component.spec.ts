import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachphongComponent } from './danhsachphong.component';

describe('DanhsachphongComponent', () => {
  let component: DanhsachphongComponent;
  let fixture: ComponentFixture<DanhsachphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
