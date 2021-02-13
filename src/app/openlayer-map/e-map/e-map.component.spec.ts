import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMapComponent } from './e-map.component';

describe('EMapComponent', () => {
  let component: EMapComponent;
  let fixture: ComponentFixture<EMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
