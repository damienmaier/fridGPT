import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Coach } from 'src/app/models/recipe';

@Component({
  selector: 'app-coach-modal',
  templateUrl: './coach-modal.component.html',
  styleUrls: ['./coach-modal.component.css']
})
export class CoachModalComponent {
  @Input() coach!: Coach;
  
  constructor(private modal: NgbActiveModal) {}

  close() {
    this.modal.close();
  }
}
