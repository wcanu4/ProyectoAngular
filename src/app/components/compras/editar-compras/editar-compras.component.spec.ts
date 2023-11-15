import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComprasComponent } from './editar-compras.component';

describe('EditarComprasComponent', () => {
  let component: EditarComprasComponent;
  let fixture: ComponentFixture<EditarComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarComprasComponent]
    });
    fixture = TestBed.createComponent(EditarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
