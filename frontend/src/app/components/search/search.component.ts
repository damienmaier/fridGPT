import { Component, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap'
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
  currentSearch: string   = '';
  generateImages: boolean = false;
  @ViewChild('ingredientsMissingToast', {static:true}) ingredientsMissingToast: any;

  constructor(private recipesService: RecipesService, private router: Router) {
    this.filteredIngredients = [];
    this.selectedIngredients = [];
    this.baseIngredients     = [];
  }

  ngOnInit() {
    this.recipesService.ingredientsSubject.subscribe(
      (list: Ingredient[]) => {
        this.baseIngredients = list; // if the ingredients list in the service changes we will be notified here as we're subscribed to it
      }
    );
    this.recipesService.loadIngredients(); // will trigger the list emission from the service
  }

  startloadingRecipes(): void {
    if(this.selectedIngredients.length <= 0) {
      const toast = new Toast(this.ingredientsMissingToast.nativeElement,{})
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
    let customAlreadyAdded: boolean = false;
    this.filteredIngredients = this.baseIngredients.filter(
      (ingredient: Ingredient) => {
        if(ingredient.name == this.currentSearch) { customAlreadyAdded = true; }
        return ingredient.name.toLowerCase().startsWith(this.currentSearch.toLowerCase())
      }
    );
    // adding custom element
    if(!customAlreadyAdded) {
      this.filteredIngredients.unshift({id:-1, selected: false, name: this.currentSearch, unit:'', defaultQuantity: 1, autoAdd: false});
    }
    // marking the selected elements
    this.filteredIngredients.map((element: Ingredient) =>
      element.selected = this.selectedIngredients.some((ingredient: Ingredient) => element.id === ingredient.id || element.name == ingredient.name)
    );
    this.filteredIngredients.sort((e1: Ingredient, e2: Ingredient) => e1.name < e2.name ? -1 : 1);
  }

  addIngredientToRecipe(newIngredient: Ingredient): void {
    if(newIngredient.selected) { 
      return; // no duplicates
    }
    newIngredient.selected    = true;
    newIngredient.id          = this.selectedIngredients.length;
    this.selectedIngredients.push(newIngredient);
    this.currentSearch        = '';
    this.filteredIngredients  = [];
  }

  removeIngredientFromList(idToRemove: number): void {
    this.selectedIngredients = this.selectedIngredients.filter(
      (ingredient: Ingredient) => ingredient.id != idToRemove
    );
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
