import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPreviewComponent } from './button-preview.component';

describe('ButtonPreviewComponent', () => {
  let component: ButtonPreviewComponent;
  let fixture: ComponentFixture<ButtonPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
