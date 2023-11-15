import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarCafeComponent } from './editar-cafe.component';



describe('EditarProveedorComponent', () => {
  let component: EditarCafeComponent;
  let fixture: ComponentFixture<EditarCafeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCafeComponent]
    });
    fixture = TestBed.createComponent(EditarCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
