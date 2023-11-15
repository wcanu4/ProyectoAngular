import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductosCompraComponent } from './editar-productos-compra.component';

describe('EditarProductosCompraComponent', () => {
  let component: EditarProductosCompraComponent;
  let fixture: ComponentFixture<EditarProductosCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProductosCompraComponent]
    });
    fixture = TestBed.createComponent(EditarProductosCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
