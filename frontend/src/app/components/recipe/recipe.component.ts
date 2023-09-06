import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Coach, Recipe } from 'src/app/models/recipe';
import { ModalService } from 'src/app/services/modal.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
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

  nextStep(forward: boolean) {
    this.currentStepIndex = (this.currentStepIndex + (forward ? 1 : -1)) % (this.recipe.steps.length + 1);
    if (this.currentStepIndex < 0) {
      this.currentStepIndex += this.recipe.steps.length + 1;
    }
    this.currentStep = this.currentStepIndex == this.recipe.steps.length ? 
      this.recipe.ingredients : this.recipe.steps[this.currentStepIndex];
  }

  openCoachModal(): void {
    this.modalService.openCoachModal(this.recipe.coach);
  }

  openHelpModal(): void {
    this.loadingHelp = true;
    this.modalService.openHelpModal(this.recipe.steps, this.currentStepIndex).subscribe(
      () => { this.loadingHelp = false; }
    )
  }
}
