import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap'
import { RecipesService } from 'src/app/services/recipes.service';
import { Ingredient, IngredientForRecipe } from 'src/app/models/ingredient';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private baseIngredients: Ingredient[];
  filteredIngredients: Ingredient[];
  selectedIngredients: IngredientForRecipe[];
  currentSearch: string   = '';
  generateImages: boolean = false;
  @ViewChild('ingredientsMissingToast', {static: true}) ingredientsMissingToast: any;

  constructor(private recipesService: RecipesService, private router: Router) {
    this.filteredIngredients = [];
    this.selectedIngredients = [];
    this.baseIngredients     = [];
  }

  ngOnInit() {
    this.recipesService.ingredientsSubject.subscribe(
      (list: Ingredient[]) => {
        this.baseIngredients = list; // if the ingredients list in the service changes we will be notified here as we're subscribed to it
        this.selectedIngredients = this.baseIngredients
          .filter((element:Ingredient) => element.autoAdd)
          .map((element:Ingredient) => new IngredientForRecipe(element));
      }
    );
    this.recipesService.loadIngredients(); // will trigger the list emission from the service
  }

  startloadingRecipes(): void {
    if(this.selectedIngredients.length <= 0) {
      const toast = new Toast(this.ingredientsMissingToast.nativeElement, {})
      toast.show();
      return; 
    }
    this.recipesService.loadRecipe(this.selectedIngredients, this.generateImages);
    this.router.navigate(['app/recipe']);
  }

  filter(): void {
    if (this.noData()) { return; }
    if (this.currentSearch === '') {
      this.filteredIngredients = [];
      return;
    } 
    let customAlreadyAdded    = false;
    this.filteredIngredients  = this.baseIngredients.filter(
      (ingredient: Ingredient) => {
        if(ingredient.name === this.currentSearch) { customAlreadyAdded = true; }
        return ingredient.name.toLowerCase().startsWith(this.currentSearch.toLowerCase())
      }
    );
    if(!customAlreadyAdded) { // adding custom element
      this.filteredIngredients.unshift({selected: false, isCustom: true, name: this.currentSearch, unit:'pièce', defaultQuantity: 1, autoAdd: false});
    }
    // marking the selected elements
    this.filteredIngredients.map(
      (element: Ingredient) => element.selected = this.selectedIngredients.some((ingredient: IngredientForRecipe) => element.name == ingredient.name)
    );
    this.filteredIngredients.sort((e1: Ingredient, e2: Ingredient) => e1.name < e2.name ? -1 : 1);
  }

  addIngredientToRecipe(ingredient: Ingredient): void {
    if(ingredient.selected) { 
      return; // no duplicates
    }
    this.selectedIngredients.push(new IngredientForRecipe(ingredient));
    this.currentSearch        = '';
    this.filteredIngredients  = [];
  }

  removeIngredientFromList(nameToRemove: string): void {
    this.selectedIngredients = this.selectedIngredients.filter((ingredient: IngredientForRecipe) => ingredient.name != nameToRemove);
  }

  noData(): boolean {
    return this.baseIngredients.length <= 0;
  }

  searchListHeight(): string {
    if(this.selectedIngredients.length <= 7) {
      return (window.screen.height * 0.4 - this.selectedIngredients.length * 34) + 'px';
    } else {
      return window.screen.height * 0.2 + 'px';
    }
  }
}
