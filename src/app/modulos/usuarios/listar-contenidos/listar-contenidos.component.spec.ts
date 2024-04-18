import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContenidosComponent } from './listar-contenidos.component';

describe('ListarContenidosComponent', () => {
  let component: ListarContenidosComponent;
  let fixture: ComponentFixture<ListarContenidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarContenidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
