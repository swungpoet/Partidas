/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZonasComponent } from './zonas.component';

describe('ZonasComponent', () => {
  let component: ZonasComponent;
  let fixture: ComponentFixture<ZonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
