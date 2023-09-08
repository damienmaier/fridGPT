import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.css']
})
/**
 * Modal that displays informations about a recipe step and can be opened from the recipe component
**/
export class HelpModalComponent {
  @Input() explanation!: string[];

  constructor(private modal: NgbActiveModal) {}

  /**
   * closes the current modal
  */
  close(): void {
    this.modal.close();
  }
}
