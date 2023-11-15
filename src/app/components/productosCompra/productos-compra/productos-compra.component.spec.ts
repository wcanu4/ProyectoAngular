import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCompraComponent } from './productos-compra.component';

describe('ProductosCompraComponent', () => {
  let component: ProductosCompraComponent;
  let fixture: ComponentFixture<ProductosCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosCompraComponent]
    });
    fixture = TestBed.createComponent(ProductosCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
