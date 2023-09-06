import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearComponent } from './rotating-image.component';

describe('GearComponent', () => {
  let component: GearComponent;
  let fixture: ComponentFixture<GearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GearComponent]
    });
    fixture = TestBed.createComponent(GearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
