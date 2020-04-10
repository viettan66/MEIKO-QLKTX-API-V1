import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDownloadJsonComponent } from './button-download-json.component';

describe('ButtonDownloadJsonComponent', () => {
  let component: ButtonDownloadJsonComponent;
  let fixture: ComponentFixture<ButtonDownloadJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonDownloadJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDownloadJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
