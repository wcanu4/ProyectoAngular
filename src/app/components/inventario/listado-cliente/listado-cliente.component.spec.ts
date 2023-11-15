import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoClienteComponent } from './listado-cliente.component';

describe('ListadoClienteComponent', () => {
  let component: ListadoClienteComponent;
  let fixture: ComponentFixture<ListadoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoClienteComponent]
    });
    fixture = TestBed.createComponent(ListadoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
