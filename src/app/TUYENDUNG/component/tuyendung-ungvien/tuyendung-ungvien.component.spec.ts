import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungUngvienComponent } from './tuyendung-ungvien.component';

describe('TuyendungUngvienComponent', () => {
  let component: TuyendungUngvienComponent;
  let fixture: ComponentFixture<TuyendungUngvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungUngvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungUngvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
