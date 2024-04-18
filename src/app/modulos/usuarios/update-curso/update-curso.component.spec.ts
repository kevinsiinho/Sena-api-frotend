import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCursoComponent } from './update-curso.component';

describe('UpdateCursoComponent', () => {
  let component: UpdateCursoComponent;
  let fixture: ComponentFixture<UpdateCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
