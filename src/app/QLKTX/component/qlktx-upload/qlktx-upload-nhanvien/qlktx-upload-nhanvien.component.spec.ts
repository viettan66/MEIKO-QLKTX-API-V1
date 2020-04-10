import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlktxUploadNhanvienComponent } from './qlktx-upload-nhanvien.component';

describe('QlktxUploadNhanvienComponent', () => {
  let component: QlktxUploadNhanvienComponent;
  let fixture: ComponentFixture<QlktxUploadNhanvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlktxUploadNhanvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlktxUploadNhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
