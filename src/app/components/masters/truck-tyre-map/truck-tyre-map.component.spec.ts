import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckTyreMapComponent } from './truck-tyre-map.component';

describe('TruckTyreMapComponent', () => {
  let component: TruckTyreMapComponent;
  let fixture: ComponentFixture<TruckTyreMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckTyreMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckTyreMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
