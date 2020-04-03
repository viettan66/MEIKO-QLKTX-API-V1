import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungLichhenComponent } from './tuyendung-lichhen.component';

describe('TuyendungLichhenComponent', () => {
  let component: TuyendungLichhenComponent;
  let fixture: ComponentFixture<TuyendungLichhenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungLichhenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungLichhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
