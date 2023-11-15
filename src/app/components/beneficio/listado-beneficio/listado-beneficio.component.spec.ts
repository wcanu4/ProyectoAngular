import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBeneficioComponent } from './listado-beneficio.component';

describe('ListadoBeneficioComponent', () => {
  let component: ListadoBeneficioComponent;
  let fixture: ComponentFixture<ListadoBeneficioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoBeneficioComponent]
    });
    fixture = TestBed.createComponent(ListadoBeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
