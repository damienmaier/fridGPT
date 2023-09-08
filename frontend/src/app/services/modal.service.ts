import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoachModalComponent } from '../components/utilities/modals/coach-modal/coach-modal.component';
import { Coach } from '../models/recipe';
import { Observable, map } from 'rxjs';
import { HelpModalComponent } from '../components/utilities/modals/help-modal/help-modal.component';
import { RecipesService } from './recipes.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
    constructor(private _modalService: NgbModal, private recipeService: RecipesService) {}

    openCoachModal(coach: Coach): void{
        const modalRef = this._modalService.open(CoachModalComponent);
        if(modalRef != undefined) {
            modalRef.componentInstance.coach = coach;
        }
    }

    openHelpModal(steps: string[], stepIndex: number): Observable<void> {
        return this.recipeService.loadHelpForStep(steps, stepIndex).pipe(map(
            (explanation: {helpText: string}) => {
                const modalRef = this._modalService.open(HelpModalComponent);
                if(modalRef != undefined) {
                    modalRef.componentInstance.explanation = explanation.helpText.replaceAll('\n', '<br>');
                }
            }
        ));
    }
}