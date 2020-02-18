import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KTXDashboardComponent } from './ktx-dashboard.component';

describe('KTXDashboardComponent', () => {
  let component: KTXDashboardComponent;
  let fixture: ComponentFixture<KTXDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KTXDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KTXDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
