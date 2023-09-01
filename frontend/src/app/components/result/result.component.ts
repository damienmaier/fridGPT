import { Component } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  recipes!: Recipe[];

  constructor(private recipeService: RecipesService) {
    this.recipes = [];
  }

  ngOnInit() {
    // we fetch the recipes that have been already loaded
    this.recipeService.recipeSubject.subscribe(
      (sentRecipes: Recipe[]) => {
        if(sentRecipes.length == 0) {
          this.recipeService.goToHome();
        }
        this.recipes = sentRecipes;
      }
    );
  }

  selectRecipe(selectedId: number): void {
    this.recipeService.onRecipeSelected(selectedId);
  }
}
