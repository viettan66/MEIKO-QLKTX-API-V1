import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDashboardComponent } from './tuyendung-dashboard.component';

describe('TuyendungDashboardComponent', () => {
  let component: TuyendungDashboardComponent;
  let fixture: ComponentFixture<TuyendungDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
