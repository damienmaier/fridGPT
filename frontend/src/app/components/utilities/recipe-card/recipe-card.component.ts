import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { ModalService } from 'src/app/services/modal.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
/**
 * Component that displays basic information about a recipe (name,image, coach) and is used in the recipe and result components
**/
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() recipeId!: number;
  @Input() selectable!: boolean;

  constructor(private modalService: ModalService, private recipeService: RecipesService) {}

  /**
   * called when we click on the bottom part of the recipe, open a modal that displays information about the recipe's coach
   */
  openCoachModal(): void {
    this.modalService.openCoachModal(this.recipe.coach);
  }

  /**
   * called when we click on the dish image, we'll navigate to the Recipe component
   */
  selectRecipe(): void {
    if(this.selectable && this.recipeId !== undefined) {
      this.recipeService.onRecipeSelected(this.recipeId);
    }
  }
}
