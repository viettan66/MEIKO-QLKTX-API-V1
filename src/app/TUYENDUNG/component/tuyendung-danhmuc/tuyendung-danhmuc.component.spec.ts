import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuyendungDanhmucComponent } from './tuyendung-danhmuc.component';

describe('TuyendungDanhmucComponent', () => {
  let component: TuyendungDanhmucComponent;
  let fixture: ComponentFixture<TuyendungDanhmucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyendungDanhmucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuyendungDanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
