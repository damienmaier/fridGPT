import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  constructor(private recipeService: RecipesService, private router: Router) {}
  recipe!: Recipe;
  loading: boolean = false;

  ngOnInit() {
    if (!this.recipeService.recipeIsLoading()) {
      this.router.navigate(['app']);
    } else {
      this.loading = true;
      this.recipeService.recipeSubject.subscribe((sentRecipe: Recipe) => {
        this.recipe = sentRecipe;
        this.loading = false;
      });
    }
  }
}
