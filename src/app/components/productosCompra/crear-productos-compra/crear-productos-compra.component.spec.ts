import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProductosCompraComponent } from './crear-productos-compra.component';

describe('CrearProductosCompraComponent', () => {
  let component: CrearProductosCompraComponent;
  let fixture: ComponentFixture<CrearProductosCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearProductosCompraComponent]
    });
    fixture = TestBed.createComponent(CrearProductosCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
