import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCallComponent } from './button-call.component';

describe('ButtonCallComponent', () => {
  let component: ButtonCallComponent;
  let fixture: ComponentFixture<ButtonCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
