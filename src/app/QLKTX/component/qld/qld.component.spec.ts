import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QldComponent } from './qld.component';

describe('QldComponent', () => {
  let component: QldComponent;
  let fixture: ComponentFixture<QldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
