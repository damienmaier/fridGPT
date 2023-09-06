import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingImageComponent } from './rotating-image.component';

describe('GearComponent', () => {
  let component: RotatingImageComponent;
  let fixture: ComponentFixture<RotatingImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotatingImageComponent]
    });
    fixture = TestBed.createComponent(RotatingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
