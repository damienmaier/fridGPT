import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnDestroy {
  recipes: Recipe[] = [];
  loading: boolean = false;
  recipesSub!: Subscription;

  constructor(private recipeService: RecipesService) {}

  ngOnInit() {
    this.loading = true;
    this.recipesSub = this.recipeService.fetchRecipes().subscribe({
      next: (sentRecipes: Recipe[]) => {
        if(sentRecipes.length == 0) {
          this.loading = false;
          this.recipeService.goToHome();
        }
        this.recipes = sentRecipes;
        this.recipeService.loadRecipeImages(this.recipes.map((recipe:Recipe) => recipe.dishName)).subscribe(
          (images: string[]) => {
            if(images.length == 0) {
              this.recipes.map((recipe: Recipe) => recipe.imageUrl = '/assets_app/empty.jpg');
            } else {
              for(let i = 0; i < this.recipes.length; ++i) {
                this.recipes[i].imageUrl = images[i];
              }
            }
            this.loading = false;
          }
        )
      } // errors catched in service
    });
  }

  selectRecipe(selectedId: number): void {
    this.recipeService.onRecipeSelected(selectedId);
  }

  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }
}
