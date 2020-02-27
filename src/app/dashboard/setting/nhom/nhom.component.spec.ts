import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomComponent } from './nhom.component';

describe('NhomComponent', () => {
  let component: NhomComponent;
  let fixture: ComponentFixture<NhomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
