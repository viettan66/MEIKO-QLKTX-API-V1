import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlrComponent } from './qlr.component';

describe('QlrComponent', () => {
  let component: QlrComponent;
  let fixture: ComponentFixture<QlrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
