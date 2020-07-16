import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesCuentaComponent } from './propiedades-cuenta.component';

describe('PropiedadesCuentaComponent', () => {
  let component: PropiedadesCuentaComponent;
  let fixture: ComponentFixture<PropiedadesCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropiedadesCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadesCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
