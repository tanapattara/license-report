import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarCarSpeedComponent } from './chart-bar-car-speed.component';

describe('ChartBarCarSpeedComponent', () => {
  let component: ChartBarCarSpeedComponent;
  let fixture: ComponentFixture<ChartBarCarSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBarCarSpeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarCarSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
