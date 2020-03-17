import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuctaisasnComponent } from './danhmuctaisasn.component';

describe('DanhmuctaisasnComponent', () => {
  let component: DanhmuctaisasnComponent;
  let fixture: ComponentFixture<DanhmuctaisasnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctaisasnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctaisasnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
