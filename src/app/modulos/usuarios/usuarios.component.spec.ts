import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponent } from './usuarios.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ UsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
