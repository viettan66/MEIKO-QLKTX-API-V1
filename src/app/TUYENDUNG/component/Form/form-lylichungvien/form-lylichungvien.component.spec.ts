import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLylichungvienComponent } from './form-lylichungvien.component';

describe('FormLylichungvienComponent', () => {
  let component: FormLylichungvienComponent;
  let fixture: ComponentFixture<FormLylichungvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLylichungvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLylichungvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
