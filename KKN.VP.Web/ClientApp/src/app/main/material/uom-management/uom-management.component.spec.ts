import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomManagementComponent } from './uom-management.component';

describe('UomManagementComponent', () => {
  let component: UomManagementComponent;
  let fixture: ComponentFixture<UomManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
