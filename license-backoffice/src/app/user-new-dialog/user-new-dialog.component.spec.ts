import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewDialogComponent } from './user-new-dialog.component';

describe('UserNewDialogComponent', () => {
  let component: UserNewDialogComponent;
  let fixture: ComponentFixture<UserNewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
