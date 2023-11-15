import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProveedoresComponent } from './listado-proveedores.component';

describe('ListadoProveedoresComponent', () => {
  let component: ListadoProveedoresComponent;
  let fixture: ComponentFixture<ListadoProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoProveedoresComponent]
    });
    fixture = TestBed.createComponent(ListadoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
