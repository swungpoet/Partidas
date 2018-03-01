/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CotizarComponent } from './cotizar.component';

describe('CotizarComponent', () => {
  let component: CotizarComponent;
  let fixture: ComponentFixture<CotizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
