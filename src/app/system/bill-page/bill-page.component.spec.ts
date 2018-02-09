/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BillPageComponent } from './bill-page.component';

describe('BillPageComponent', () => {
  let component: BillPageComponent;
  let fixture: ComponentFixture<BillPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
