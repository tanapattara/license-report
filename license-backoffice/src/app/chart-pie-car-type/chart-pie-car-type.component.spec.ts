import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieCarTypeComponent } from './chart-pie-car-type.component';

describe('ChartPieCarTypeComponent', () => {
  let component: ChartPieCarTypeComponent;
  let fixture: ComponentFixture<ChartPieCarTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPieCarTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPieCarTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
