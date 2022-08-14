import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupNewUserComponent } from './signup-new-user.component';

describe('SignupNewUserComponent', () => {
  let component: SignupNewUserComponent;
  let fixture: ComponentFixture<SignupNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupNewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
