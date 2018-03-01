import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaExternaComponent } from './alta-externa.component';

describe('AltaExternaComponent', () => {
  let component: AltaExternaComponent;
  let fixture: ComponentFixture<AltaExternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaExternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
