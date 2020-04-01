import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtintrangchuComponent } from './thongtintrangchu.component';

describe('ThongtintrangchuComponent', () => {
  let component: ThongtintrangchuComponent;
  let fixture: ComponentFixture<ThongtintrangchuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtintrangchuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtintrangchuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
