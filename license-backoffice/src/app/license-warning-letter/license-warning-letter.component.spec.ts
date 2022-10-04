import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseWarningLetterComponent } from './license-warning-letter.component';

describe('LicenseWarningLetterComponent', () => {
  let component: LicenseWarningLetterComponent;
  let fixture: ComponentFixture<LicenseWarningLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseWarningLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseWarningLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
