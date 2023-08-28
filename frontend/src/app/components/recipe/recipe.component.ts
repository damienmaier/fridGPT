import { Component } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  constructor(private recipeService: RecipesService) {}
  recipe!: Recipe;
  loading: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.recipeService.recipeSubject.subscribe((sentRecipe: Recipe) => {
      
      setTimeout(() => {
        // TODO: DELETE THIS TIMEOUT, it's just for testing because it goes too fast for now :v (#suffering from success)
        this.recipe = sentRecipe;
        this.loading = false;
      }, 2000);
    });
  }
}
