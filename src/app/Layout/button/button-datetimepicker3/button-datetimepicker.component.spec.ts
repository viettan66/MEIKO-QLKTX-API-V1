import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDatetimepickerComponent } from './button-datetimepicker.component';

describe('ButtonDatetimepickerComponent', () => {
  let component: ButtonDatetimepickerComponent;
  let fixture: ComponentFixture<ButtonDatetimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonDatetimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
