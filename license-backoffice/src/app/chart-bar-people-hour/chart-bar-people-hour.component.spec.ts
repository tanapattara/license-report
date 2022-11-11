import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarPeopleHourComponent } from './chart-bar-people-hour.component';

describe('ChartBarPeopleHourComponent', () => {
  let component: ChartBarPeopleHourComponent;
  let fixture: ComponentFixture<ChartBarPeopleHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBarPeopleHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarPeopleHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
