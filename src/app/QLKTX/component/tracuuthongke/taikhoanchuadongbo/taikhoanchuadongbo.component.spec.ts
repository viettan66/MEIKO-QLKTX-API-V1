import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaikhoanchuadongboComponent } from './taikhoanchuadongbo.component';

describe('TaikhoanchuadongboComponent', () => {
  let component: TaikhoanchuadongboComponent;
  let fixture: ComponentFixture<TaikhoanchuadongboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaikhoanchuadongboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikhoanchuadongboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
