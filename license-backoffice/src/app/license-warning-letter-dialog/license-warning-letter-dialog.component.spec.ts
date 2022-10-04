import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseWarningLetterDialogComponent } from './license-warning-letter-dialog.component';

describe('LicenseWarningLetterDialogComponent', () => {
  let component: LicenseWarningLetterDialogComponent;
  let fixture: ComponentFixture<LicenseWarningLetterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseWarningLetterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseWarningLetterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
