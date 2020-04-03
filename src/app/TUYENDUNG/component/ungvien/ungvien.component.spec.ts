import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UngvienComponent } from './ungvien.component';

describe('UngvienComponent', () => {
  let component: UngvienComponent;
  let fixture: ComponentFixture<UngvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UngvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UngvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
