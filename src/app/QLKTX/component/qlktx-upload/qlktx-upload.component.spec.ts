import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlktxUploadComponent } from './qlktx-upload.component';

describe('QlktxUploadComponent', () => {
  let component: QlktxUploadComponent;
  let fixture: ComponentFixture<QlktxUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlktxUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlktxUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
