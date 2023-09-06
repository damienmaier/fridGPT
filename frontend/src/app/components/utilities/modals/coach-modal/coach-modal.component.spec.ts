import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachModalComponent } from './coach-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('CoachModalComponent', () => {
  let component: CoachModalComponent;
  let fixture: ComponentFixture<CoachModalComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CoachModalComponent],
      providers:    [NgbActiveModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(CoachModalComponent);
    component  = fixture.componentInstance;
    component.coach = {name: '', description: '', imageUrl:''}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
