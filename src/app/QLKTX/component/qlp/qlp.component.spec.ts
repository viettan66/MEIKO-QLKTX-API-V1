import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QLPComponent } from './qlp.component';

describe('QLPComponent', () => {
  let component: QLPComponent;
  let fixture: ComponentFixture<QLPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QLPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QLPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
