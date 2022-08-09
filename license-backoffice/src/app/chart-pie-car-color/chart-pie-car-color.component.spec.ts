import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieCarColorComponent } from './chart-pie-car-color.component';

describe('ChartPieCarColorComponent', () => {
  let component: ChartPieCarColorComponent;
  let fixture: ComponentFixture<ChartPieCarColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPieCarColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPieCarColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
