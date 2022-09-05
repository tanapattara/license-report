import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHeatmapHourComponent } from './chart-heatmap-hour.component';

describe('ChartHeatmapHourComponent', () => {
  let component: ChartHeatmapHourComponent;
  let fixture: ComponentFixture<ChartHeatmapHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartHeatmapHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHeatmapHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
