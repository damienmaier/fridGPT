import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachModalComponent } from './coach-modal.component';

describe('CoachModalComponent', () => {
  let component: CoachModalComponent;
  let fixture: ComponentFixture<CoachModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachModalComponent]
    });
    fixture = TestBed.createComponent(CoachModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
