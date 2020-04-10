import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlktxUploadGiuongComponent } from './qlktx-upload-giuong.component';

describe('QlktxUploadGiuongComponent', () => {
  let component: QlktxUploadGiuongComponent;
  let fixture: ComponentFixture<QlktxUploadGiuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlktxUploadGiuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlktxUploadGiuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
