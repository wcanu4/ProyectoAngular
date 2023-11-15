import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVentasComponent } from './editar-ventas.component';

describe('EditarVentasComponent', () => {
  let component: EditarVentasComponent;
  let fixture: ComponentFixture<EditarVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarVentasComponent]
    });
    fixture = TestBed.createComponent(EditarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
