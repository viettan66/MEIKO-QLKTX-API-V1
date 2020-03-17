import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndonComponent } from './indon.component';

describe('IndonComponent', () => {
  let component: IndonComponent;
  let fixture: ComponentFixture<IndonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
