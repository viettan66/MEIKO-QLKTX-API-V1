import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlktxUploadTuComponent } from './qlktx-upload-tu.component';

describe('QlktxUploadTuComponent', () => {
  let component: QlktxUploadTuComponent;
  let fixture: ComponentFixture<QlktxUploadTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlktxUploadTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlktxUploadTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
