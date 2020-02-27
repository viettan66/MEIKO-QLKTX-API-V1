import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QLTBComponent } from './qltb.component';

describe('QLTBComponent', () => {
  let component: QLTBComponent;
  let fixture: ComponentFixture<QLTBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QLTBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QLTBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
