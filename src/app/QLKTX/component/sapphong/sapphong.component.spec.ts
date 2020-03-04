import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SapphongComponent } from './sapphong.component';

describe('SapphongComponent', () => {
  let component: SapphongComponent;
  let fixture: ComponentFixture<SapphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SapphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SapphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
