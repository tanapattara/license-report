import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHeatmapMonthComponent } from './chart-heatmap-month.component';

describe('ChartHeatmapMonthComponent', () => {
  let component: ChartHeatmapMonthComponent;
  let fixture: ComponentFixture<ChartHeatmapMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartHeatmapMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHeatmapMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
