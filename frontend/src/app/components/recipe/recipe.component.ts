import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { ModalService } from 'src/app/services/modal.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
/**
 * Component that will display one of the generated recipes that the user selected
**/
export class RecipeComponent {
  recipe!: Recipe;
  currentStep: string = '';
  currentStepIndex!: number;
  loadingHelp: boolean = false;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private modalService: ModalService) {}

  ngOnInit() {
    const index             = this.route.snapshot.paramMap.get('recipeId');
    this.recipe             = this.recipeService.getRecipe(index == null ? -1 : +index);
    this.currentStep        = this.recipe.ingredients;
    this.currentStepIndex   = this.recipe.steps.length;
    if(this.recipe.dishName === '') {
      this.recipeService.goToHome(); // no recipes loaded, go back to home screen
    }
    this.recipe.ingredients = this.recipe.ingredients.replaceAll('\n', '<br>'); 
  }

  /**
   * updates the displayed step
   * @param forward navigation direction between recipe steps
   */
  nextStep(forward: boolean) {
    this.currentStepIndex = (this.currentStepIndex + (forward ? 1 : -1)) % (this.recipe.steps.length + 1);
    if (this.currentStepIndex < 0) {
      this.currentStepIndex += this.recipe.steps.length + 1;
    }
    this.currentStep = this.currentStepIndex == this.recipe.steps.length ? 
      this.recipe.ingredients : this.recipe.steps[this.currentStepIndex];
  }

  /**
   * triggers a modal that will display information about the coach that suggested the recipe
   */
  openCoachModal(): void {
    this.modalService.openCoachModal(this.recipe.coach);
  }

  /**
   * triggers a modal that will display more information about the current step (will call the API to get this info)
   */
  openHelpModal(): void {
    this.loadingHelp = true;
    this.modalService.openHelpModal(this.recipe.steps, this.currentStepIndex).subscribe(
      () => { this.loadingHelp = false; }
    )
  }
}
