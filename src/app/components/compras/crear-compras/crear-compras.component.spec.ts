import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComprasComponent } from './crear-compras.component';

describe('CrearComprasComponent', () => {
  let component: CrearComprasComponent;
  let fixture: ComponentFixture<CrearComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearComprasComponent]
    });
    fixture = TestBed.createComponent(CrearComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
