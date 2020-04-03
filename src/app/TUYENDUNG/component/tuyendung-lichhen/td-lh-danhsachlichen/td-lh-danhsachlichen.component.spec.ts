import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdLhDanhsachlichenComponent } from './td-lh-danhsachlichen.component';

describe('TdLhDanhsachlichenComponent', () => {
  let component: TdLhDanhsachlichenComponent;
  let fixture: ComponentFixture<TdLhDanhsachlichenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdLhDanhsachlichenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdLhDanhsachlichenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
