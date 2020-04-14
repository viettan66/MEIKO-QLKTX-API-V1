import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAccountModalComponent } from './select-account-modal.component';

describe('SelectAccountModalComponent', () => {
  let component: SelectAccountModalComponent;
  let fixture: ComponentFixture<SelectAccountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
