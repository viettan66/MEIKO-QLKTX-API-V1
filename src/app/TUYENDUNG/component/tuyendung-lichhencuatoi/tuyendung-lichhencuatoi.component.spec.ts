import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungLichhencuatoiComponent } from './tuyendung-lichhencuatoi.component';

describe('TuyendungLichhencuatoiComponent', () => {
  let component: TuyendungLichhencuatoiComponent;
  let fixture: ComponentFixture<TuyendungLichhencuatoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungLichhencuatoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungLichhencuatoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
