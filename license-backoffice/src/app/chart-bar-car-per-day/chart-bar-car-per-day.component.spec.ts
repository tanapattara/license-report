import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarCarPerDayComponent } from './chart-bar-car-per-day.component';

describe('ChartBarCarPerDayComponent', () => {
  let component: ChartBarCarPerDayComponent;
  let fixture: ComponentFixture<ChartBarCarPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBarCarPerDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarCarPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
