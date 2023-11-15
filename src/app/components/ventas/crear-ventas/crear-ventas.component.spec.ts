import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVentasComponent } from './crear-ventas.component';

describe('CrearVentasComponent', () => {
  let component: CrearVentasComponent;
  let fixture: ComponentFixture<CrearVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearVentasComponent]
    });
    fixture = TestBed.createComponent(CrearVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
