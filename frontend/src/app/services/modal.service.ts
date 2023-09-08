import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoachModalComponent } from '../components/utilities/modals/coach-modal/coach-modal.component';
import { Coach } from '../models/recipe';
import { Observable, map } from 'rxjs';
import { HelpModalComponent } from '../components/utilities/modals/help-modal/help-modal.component';
import { RecipesService } from './recipes.service';
import { Injectable } from '@angular/core';

/**
 * used to open the coach or the help modal from anywhere in the app
 */
@Injectable()
export class ModalService {
    constructor(private _modalService: NgbModal, private recipeService: RecipesService) {}

    /**
     * open a coach modal displaying their information
     * @param coach coach to display in the modal
     */
    openCoachModal(coach: Coach): void {
        const modalRef = this._modalService.open(CoachModalComponent);
        if(modalRef !== undefined) {
            modalRef.componentInstance.coach = coach;
        }
    }

    /**
     * calls the API to explain more a specific recipe's step
     * @param steps recipe's steps
     * @param stepIndex index of the step we need help with
     * @returns an observable based on the API request for the new step description
     */
    openHelpModal(steps: string[], stepIndex: number): Observable<void> {
        return this.recipeService.loadHelpForStep(steps, stepIndex).pipe(map(
            (explanation: {helpText: string}) => {
                const modalRef = this._modalService.open(HelpModalComponent);
                if(modalRef !== undefined) {
                    modalRef.componentInstance.explanation = explanation.helpText.replaceAll('\n', '<br>');
                }
            }
        ));
    }
}