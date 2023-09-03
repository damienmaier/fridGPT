import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  recipe!: Recipe;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute) {}

  ngOnInit() {
    const index   = this.route.snapshot.paramMap.get('recipeId');
    const recipe  = this.recipeService.getRecipe(index == null ? -1 : +index);
    if(recipe == null) {
      this.recipeService.goToHome(); // no recipes loaded, go back to home screen
    } else {
      this.recipe = recipe;
    }
  }
}
