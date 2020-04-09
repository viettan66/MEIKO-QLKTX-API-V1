import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungYeucaubophanComponent } from './tuyendung-yeucaubophan.component';

describe('TuyendungYeucaubophanComponent', () => {
  let component: TuyendungYeucaubophanComponent;
  let fixture: ComponentFixture<TuyendungYeucaubophanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungYeucaubophanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungYeucaubophanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
