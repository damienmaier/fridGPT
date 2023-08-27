import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { BaseIngredient, Ingredient } from 'src/app/models/ingredient'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  filteredIngredients: BaseIngredient[];
  selectedIngredients: Ingredient[];
  currentSearch: string = '';

  constructor(private recipesService: RecipesService, private router: Router) {
    this.filteredIngredients = [];
    this.selectedIngredients = [];
  }

  filter(): void {
    if(this.currentSearch === '') {
      this.filteredIngredients = [];
    } else {
      this.filteredIngredients = this.recipesService.getIngredients().filter(
        (ingredient: BaseIngredient) => ingredient.name.toLowerCase().startsWith(this.currentSearch.toLowerCase())
      );
    }
  }

  addIngredientToRecipe(baseIngredient: BaseIngredient): void {
    this.selectedIngredients.push(
      {id: this.selectedIngredients.length, baseIngredient: baseIngredient, quantity: 1}
    );
  }

  removeIngredientFromList(idToRemove: number): void {
    this.selectedIngredients = this.selectedIngredients.filter(
      (ingredient: Ingredient) => ingredient.id != idToRemove
    );
  }

  startloadingRecipes() {
    this.router.navigate(['loading']);
  }
}
