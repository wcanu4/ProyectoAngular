import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarBeneficioComponent } from './editar-beneficio.component';



describe('EditarBeneficioComponent', () => {
  let component: EditarBeneficioComponent;
  let fixture: ComponentFixture<EditarBeneficioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarBeneficioComponent]
    });
    fixture = TestBed.createComponent(EditarBeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
