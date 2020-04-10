import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCountComponent } from './button-count.component';

describe('ButtonCountComponent', () => {
  let component: ButtonCountComponent;
  let fixture: ComponentFixture<ButtonCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
