import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAccountAddKTXComponent } from './select-account-add-ktx.component';

describe('SelectAccountAddKTXComponent', () => {
  let component: SelectAccountAddKTXComponent;
  let fixture: ComponentFixture<SelectAccountAddKTXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAccountAddKTXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAccountAddKTXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
