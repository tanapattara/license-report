import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninErrorDialogComponent } from './signin-error-dialog.component';

describe('SigninErrorDialogComponent', () => {
  let component: SigninErrorDialogComponent;
  let fixture: ComponentFixture<SigninErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninErrorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
