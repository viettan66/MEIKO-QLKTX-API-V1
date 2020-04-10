import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlktxUploadPhongComponent } from './qlktx-upload-phong.component';

describe('QlktxUploadPhongComponent', () => {
  let component: QlktxUploadPhongComponent;
  let fixture: ComponentFixture<QlktxUploadPhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlktxUploadPhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlktxUploadPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
