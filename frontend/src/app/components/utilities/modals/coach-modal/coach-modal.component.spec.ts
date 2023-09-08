import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachModalComponent } from './coach-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { click, findElement } from 'src/tests/main.test-helper';
import { createFakeCoach } from 'src/tests/model.test-helper';
import { Coach } from 'src/app/models/recipe';

describe('CoachModalComponent', () => {
  let component: CoachModalComponent;
  let fixture: ComponentFixture<CoachModalComponent>;
  const fakeCoach: Coach = createFakeCoach();
  let nbgModal: NgbActiveModal;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CoachModalComponent],
      providers:    [NgbActiveModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(CoachModalComponent);
    component  = fixture.componentInstance;
    nbgModal = TestBed.inject(NgbActiveModal);
    component.coach = fakeCoach;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the coach information', () => {
    expect(findElement(fixture, 'coach-name').nativeElement.textContent).toContain(fakeCoach.name);
    expect(findElement(fixture, 'coach-descr').nativeElement.textContent).toContain(fakeCoach.description);
  });

  it('click on the button at the bottom should close the modal', () => {
    const closeSpy = spyOn(nbgModal, 'close').and.callThrough();
    click(fixture,'close-btn');
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalled();
  });
});
