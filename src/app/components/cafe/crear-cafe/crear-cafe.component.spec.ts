import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCafeComponent } from './crear-cafe.component';

describe('CrearCafeComponent', () => {
  let component: CrearCafeComponent;
  let fixture: ComponentFixture<CrearCafeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCafeComponent]
    });
    fixture = TestBed.createComponent(CrearCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
