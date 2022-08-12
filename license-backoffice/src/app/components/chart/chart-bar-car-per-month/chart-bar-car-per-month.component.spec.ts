import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarCarPerMonthComponent } from './chart-bar-car-per-month.component';

describe('ChartBarCarPerMonthComponent', () => {
  let component: ChartBarCarPerMonthComponent;
  let fixture: ComponentFixture<ChartBarCarPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBarCarPerMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarCarPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
