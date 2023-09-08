import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpModalComponent } from './help-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { click, findElement } from 'src/tests/main.test-helper';

describe('HelpModalComponent', () => {
  let component: HelpModalComponent;
  let fixture: ComponentFixture<HelpModalComponent>;
  let nbgModal: NgbActiveModal;
  const fakeExplanation = ['this is a fake explanation'];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HelpModalComponent],
      providers:    [NgbActiveModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture               = TestBed.createComponent(HelpModalComponent);
    component             = fixture.componentInstance;
    component.explanation = fakeExplanation;
    nbgModal              = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the step explanation', () => {
    expect(findElement(fixture, 'explanation').nativeElement.textContent).toContain(fakeExplanation[0]);
  });

  it('click on the button at the bottom should close the modal', () => {
    const closeSpy = spyOn(nbgModal, 'close').and.callThrough();
    click(fixture,'close-btn');
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalled();
  });
});
