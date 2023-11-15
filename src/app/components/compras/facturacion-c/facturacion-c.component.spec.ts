import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionCComponent } from './facturacion-c.component';

describe('FacturacionCComponent', () => {
  let component: FacturacionCComponent;
  let fixture: ComponentFixture<FacturacionCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturacionCComponent]
    });
    fixture = TestBed.createComponent(FacturacionCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
