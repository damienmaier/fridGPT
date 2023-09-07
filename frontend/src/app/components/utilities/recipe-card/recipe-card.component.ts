import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { ModalService } from 'src/app/services/modal.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() recipeId!: number;
  @Input() selectable!: boolean;

  constructor(private modalService: ModalService, private recipeService: RecipesService) {}

  openCoachModal(): void {
    this.modalService.openCoachModal(this.recipe.coach);
  }

  selectRecipe(): void {
    if(this.selectable && this.recipeId !== undefined) {
      this.recipeService.onRecipeSelected(this.recipeId);
    }
  }
}
