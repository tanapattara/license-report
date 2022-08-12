import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTimeSpeedComponent } from './filter-time-speed.component';

describe('FilterTimeSpeedComponent', () => {
  let component: FilterTimeSpeedComponent;
  let fixture: ComponentFixture<FilterTimeSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTimeSpeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTimeSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
