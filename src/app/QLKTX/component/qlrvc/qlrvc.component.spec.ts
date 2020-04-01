import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlrvcComponent } from './qlrvc.component';

describe('QlrvcComponent', () => {
  let component: QlrvcComponent;
  let fixture: ComponentFixture<QlrvcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlrvcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlrvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
