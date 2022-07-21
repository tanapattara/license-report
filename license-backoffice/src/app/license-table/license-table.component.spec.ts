import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTableComponent } from './license-table.component';

describe('LicenseTableComponent', () => {
  let component: LicenseTableComponent;
  let fixture: ComponentFixture<LicenseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
