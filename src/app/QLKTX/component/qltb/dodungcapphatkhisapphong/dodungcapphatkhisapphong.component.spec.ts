import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodungcapphatkhisapphongComponent } from './dodungcapphatkhisapphong.component';

describe('DodungcapphatkhisapphongComponent', () => {
  let component: DodungcapphatkhisapphongComponent;
  let fixture: ComponentFixture<DodungcapphatkhisapphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodungcapphatkhisapphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodungcapphatkhisapphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
