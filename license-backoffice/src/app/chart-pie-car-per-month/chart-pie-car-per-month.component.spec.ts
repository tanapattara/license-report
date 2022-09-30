import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieCarPerMonthComponent } from './chart-pie-car-per-month.component';

describe('ChartPieCarPerMonthComponent', () => {
  let component: ChartPieCarPerMonthComponent;
  let fixture: ComponentFixture<ChartPieCarPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPieCarPerMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPieCarPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
