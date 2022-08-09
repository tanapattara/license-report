import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarCarPerHourComponent } from './chart-bar-car-per-hour.component';

describe('ChartBarCarPerHourComponent', () => {
  let component: ChartBarCarPerHourComponent;
  let fixture: ComponentFixture<ChartBarCarPerHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBarCarPerHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarCarPerHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
