import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private baseIngredients: Ingredient[];
  filteredIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
  currentSearch: string = '';

  constructor(private recipesService: RecipesService, private router: Router) {
    this.filteredIngredients = [];
    this.selectedIngredients = [];
    this.baseIngredients     = [];
  }

  ngOnInit() {
    this.recipesService.ingredientsSubject.subscribe(
      (list: Ingredient[]) => {
        this.baseIngredients = list;
        // if the ingredients list in the service changes we will be notified here as we're subscribed to it
      }
    );
    this.recipesService.loadIngredients(); // will trigger the list emission from the service
  }

  startloadingRecipes(): void {
    if(this.selectedIngredients.length <= 0) { return; }
    this.recipesService.loadRecipe(this.selectedIngredients);
    this.router.navigate(['app/recipe']);
  }

  filter(): void {
    if (this.noData()) {
      return;
    }
    if (this.currentSearch === '') {
      this.filteredIngredients = [];
    } else {
      this.filteredIngredients = this.baseIngredients.filter(
        (ingredient: Ingredient) =>
          ingredient.strIngredient
            .toLowerCase()
            .startsWith(this.currentSearch.toLowerCase())
      );
      this.filteredIngredients.sort((e1: Ingredient, e2: Ingredient) => e1.strIngredient < e2.strIngredient ? -1 : 1);
    }
  }

  addIngredientToRecipe(baseIngredient: Ingredient): void {
    this.selectedIngredients.push(baseIngredient);
    this.currentSearch        = '';
    this.filteredIngredients  = [];
  }

  removeIngredientFromList(idToRemove: number): void {
    this.selectedIngredients = this.selectedIngredients.filter(
      (ingredient: Ingredient) => ingredient.idIngredient != idToRemove
    );
  }

  noData(): boolean {
    return this.baseIngredients.length <= 0;
  }

  searchListHeight(): string {
    return (window.screen.height / 2 - this.selectedIngredients.length * 34) +'px';
  }
}
