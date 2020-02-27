import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuaccountComponent } from './menuaccount.component';

describe('MenuaccountComponent', () => {
  let component: MenuaccountComponent;
  let fixture: ComponentFixture<MenuaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
