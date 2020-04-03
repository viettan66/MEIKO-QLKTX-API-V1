import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdLhThemlichenComponent } from './td-lh-themlichen.component';

describe('TdLhThemlichenComponent', () => {
  let component: TdLhThemlichenComponent;
  let fixture: ComponentFixture<TdLhThemlichenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdLhThemlichenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdLhThemlichenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
