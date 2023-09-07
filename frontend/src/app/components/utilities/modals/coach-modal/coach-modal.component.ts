import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Coach } from 'src/app/models/recipe';

@Component({
  selector: 'app-coach-modal',
  templateUrl: './coach-modal.component.html',
  styleUrls: ['./coach-modal.component.css']
})
/**
 * Modal that displays informations about a coach (name, image, description) and can be opened from the recipe and result components
**/
export class CoachModalComponent {
  @Input() coach!: Coach;
  
  constructor(private modal: NgbActiveModal) {}

  close() {
    this.modal.close();
  }
}
