import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracuuthongkeComponent } from './tracuuthongke.component';

describe('TracuuthongkeComponent', () => {
  let component: TracuuthongkeComponent;
  let fixture: ComponentFixture<TracuuthongkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracuuthongkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracuuthongkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
