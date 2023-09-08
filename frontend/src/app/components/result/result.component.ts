import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
/**
 * Component that displays the generated recipes to be selected
**/
export class ResultComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  loading: boolean;
  recipesSub!: Subscription;

  constructor(private recipeService: RecipesService) {
    this.recipes = [];
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading    = true;
    this.recipesSub = this.recipeService.recipesSubject.subscribe({
      next: (sentRecipes: Recipe[]) => {
        if(sentRecipes.length == 0) {
          this.loading = false;
          this.recipeService.goToHome();
          return;
        }
        this.recipes = sentRecipes;
        this.loading = false;
      } // errors catched in service
    });
    this.recipeService.loadRecipes();
  }

  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }
}
