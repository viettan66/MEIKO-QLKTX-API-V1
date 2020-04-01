import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormketthucluutruComponent } from './formketthucluutru.component';

describe('FormketthucluutruComponent', () => {
  let component: FormketthucluutruComponent;
  let fixture: ComponentFixture<FormketthucluutruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormketthucluutruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormketthucluutruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
