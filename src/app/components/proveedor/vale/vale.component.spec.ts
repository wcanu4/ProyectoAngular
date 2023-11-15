import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeComponent } from './vale.component';

describe('FacturacionComponent', () => {
  let component: ValeComponent;
  let fixture: ComponentFixture<ValeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValeComponent]
    });
    fixture = TestBed.createComponent(ValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
