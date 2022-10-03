import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseEditDialogComponent } from './license-edit-dialog.component';

describe('LicenseEditDialogComponent', () => {
  let component: LicenseEditDialogComponent;
  let fixture: ComponentFixture<LicenseEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
