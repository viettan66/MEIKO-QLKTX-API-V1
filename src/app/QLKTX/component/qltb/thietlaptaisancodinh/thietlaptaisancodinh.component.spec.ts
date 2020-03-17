import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThietlaptaisancodinhComponent } from './thietlaptaisancodinh.component';

describe('ThietlaptaisancodinhComponent', () => {
  let component: ThietlaptaisancodinhComponent;
  let fixture: ComponentFixture<ThietlaptaisancodinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThietlaptaisancodinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThietlaptaisancodinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
