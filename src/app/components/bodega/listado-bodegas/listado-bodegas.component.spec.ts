import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBodegasComponent } from './listado-bodegas.component';

describe('ListadoBodegasComponent', () => {
  let component: ListadoBodegasComponent;
  let fixture: ComponentFixture<ListadoBodegasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoBodegasComponent]
    });
    fixture = TestBed.createComponent(ListadoBodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
