import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungYeucauComponent } from './tuyendung-yeucau.component';

describe('TuyendungYeucauComponent', () => {
  let component: TuyendungYeucauComponent;
  let fixture: ComponentFixture<TuyendungYeucauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungYeucauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungYeucauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
