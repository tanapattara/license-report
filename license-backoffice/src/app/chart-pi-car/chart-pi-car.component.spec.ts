import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPiCarComponent } from './chart-pi-car.component';

describe('ChartPiCarComponent', () => {
  let component: ChartPiCarComponent;
  let fixture: ComponentFixture<ChartPiCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPiCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPiCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
