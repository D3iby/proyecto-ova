import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Module7Component } from './module7.component';

describe('Module7Component', () => {
  let component: Module7Component;
  let fixture: ComponentFixture<Module7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Module7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Module7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
