import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModalComponent } from './help-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('HelpModalComponent', () => {
  let component: HelpModalComponent;
  let fixture: ComponentFixture<HelpModalComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HelpModalComponent],
      providers:    [NgbActiveModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(HelpModalComponent);
    component  = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
