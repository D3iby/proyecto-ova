import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Module6Component } from './module6.component';

describe('Module6Component', () => {
  let component: Module6Component;
  let fixture: ComponentFixture<Module6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Module6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Module6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
