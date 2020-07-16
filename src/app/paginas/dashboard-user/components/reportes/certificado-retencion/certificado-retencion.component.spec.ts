import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoRetencionComponent } from './certificado-retencion.component';

describe('CertificadoRetencionComponent', () => {
  let component: CertificadoRetencionComponent;
  let fixture: ComponentFixture<CertificadoRetencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoRetencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoRetencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
