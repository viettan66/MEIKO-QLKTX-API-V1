import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlnaComponent } from './qlna.component';

describe('QlnaComponent', () => {
  let component: QlnaComponent;
  let fixture: ComponentFixture<QlnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
