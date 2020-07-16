import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsobancariaComponent } from './asobancaria.component';

describe('AsobancariaComponent', () => {
  let component: AsobancariaComponent;
  let fixture: ComponentFixture<AsobancariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsobancariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsobancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
