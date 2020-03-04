import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdangkyokytucxaComponent } from './formdangkyokytucxa.component';

describe('FormdangkyokytucxaComponent', () => {
  let component: FormdangkyokytucxaComponent;
  let fixture: ComponentFixture<FormdangkyokytucxaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormdangkyokytucxaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdangkyokytucxaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
