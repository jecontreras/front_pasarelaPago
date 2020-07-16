import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldosRetirosComponent } from './saldos-retiros.component';

describe('SaldosRetirosComponent', () => {
  let component: SaldosRetirosComponent;
  let fixture: ComponentFixture<SaldosRetirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldosRetirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldosRetirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
