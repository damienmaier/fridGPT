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
  private baseIngredients: BaseIngredient[];
  filteredIngredients: BaseIngredient[];
  selectedIngredients: Ingredient[];
  currentSearch: string = '';

  constructor(private recipesService: RecipesService, private router: Router) {
    this.filteredIngredients  = [];
    this.selectedIngredients  = [];
    this.baseIngredients      = [];
  }

  ngOnInit() {
    this.recipesService.ingredientsSubject.subscribe(
      (sub: BaseIngredient[]) => { 
        this.baseIngredients = sub; 
        // if the ingredients list in the service changes we will be notified here as we're subscribed to it
      }
    );
    this.recipesService.loadIngredients(); // will trigger the list emission from the service
  }

  filter(): void {
    if(this.noData()) { return; }
    if(this.currentSearch === '' ) {
      this.filteredIngredients = [];
    } else {
      this.filteredIngredients = this.baseIngredients.filter(
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

  startloadingRecipes(): void {
    this.router.navigate(['loading']);
  }

  noData(): boolean {
    return !this.baseIngredients || this.baseIngredients.length <= 0;
  }
}
