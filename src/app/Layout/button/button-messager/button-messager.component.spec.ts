import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMessagerComponent } from './button-messager.component';

describe('ButtonMessagerComponent', () => {
  let component: ButtonMessagerComponent;
  let fixture: ComponentFixture<ButtonMessagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonMessagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMessagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
