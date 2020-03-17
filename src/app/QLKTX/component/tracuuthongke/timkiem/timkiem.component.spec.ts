import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimkiemComponent } from './timkiem.component';

describe('TimkiemComponent', () => {
  let component: TimkiemComponent;
  let fixture: ComponentFixture<TimkiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimkiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimkiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
