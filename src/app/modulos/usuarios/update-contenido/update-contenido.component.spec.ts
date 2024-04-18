import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContenidoComponent } from './update-contenido.component';

describe('UpdateContenidoComponent', () => {
  let component: UpdateContenidoComponent;
  let fixture: ComponentFixture<UpdateContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContenidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
