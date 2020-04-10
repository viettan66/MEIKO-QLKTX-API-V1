import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFGPComponent } from './dashboard-fgp.component';

describe('DashboardFGPComponent', () => {
  let component: DashboardFGPComponent;
  let fixture: ComponentFixture<DashboardFGPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFGPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
