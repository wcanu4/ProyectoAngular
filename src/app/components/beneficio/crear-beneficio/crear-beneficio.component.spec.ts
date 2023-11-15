import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBeneficioComponent } from './crear-beneficio.component';

describe('CrearBeneficioComponent', () => {
  let component: CrearBeneficioComponent;
  let fixture: ComponentFixture<CrearBeneficioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearBeneficioComponent]
    });
    fixture = TestBed.createComponent(CrearBeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
