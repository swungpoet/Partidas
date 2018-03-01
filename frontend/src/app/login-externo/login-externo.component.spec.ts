import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginExternoComponent } from './login-externo.component';

describe('LoginExternoComponent', () => {
  let component: LoginExternoComponent;
  let fixture: ComponentFixture<LoginExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
