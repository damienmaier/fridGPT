import { Component, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap'
import { RecipesService } from 'src/app/services/recipes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SuggestedIngredient } from 'src/app/models/suggested-ingredient';
import { APIError } from 'src/app/models/api-error';
import { RequestedIngredient } from 'src/app/models/requested-ingredient';
import { createRequestedIngredient } from 'src/app/models/translation-tool';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private baseIngredients: SuggestedIngredient[];
  filteredIngredients: SuggestedIngredient[];
  selectedIngredients: RequestedIngredient[];
  currentSearch: string   = '';
  generateImages: boolean = false;
  loading: boolean        = false;
  @ViewChild('ErrorToast', {static: true}) toastOnError: any;

  constructor(private recipesService: RecipesService) {
    this.filteredIngredients = [];
    this.selectedIngredients = [];
    this.baseIngredients     = [];
  }

  ngOnInit() {
    this.recipesService.ingredientsSubject.subscribe(
      (list: SuggestedIngredient[]) => {
        this.baseIngredients      = list;
        this.baseIngredients.forEach((ingredient: SuggestedIngredient) => {
          if(ingredient.autoAdd) { this.addIngredientToList(ingredient); }
        });
      }
    );
    this.recipesService.loadIngredients(); // will trigger the list emission from the service
  }

  startloadingRecipes(): void {
    if(this.selectedIngredients.length <= 0) {
      this.displayToast('Veuillez sélectionner des ingrédients');
      return; 
    }
    this.loading = true;
    this.recipesService.loadRecipe(this.selectedIngredients, this.generateImages).subscribe({
      next: () => {},
      error: (httpError: HttpErrorResponse) => {
        if(httpError.error) {
          const error: APIError = httpError.error;
          let message = error.error;
          if(error.ingredient) {
            message += `\n L'ingrédient ${error.ingredient.name} est incorrect`;
            this.displayToast(message);
          } 
        } else {
          this.displayToast('Une erreur est survenue lors du chargement des recettes');
        }
      },
      complete: () => this.loading = false
    });
  }

  filter(): void {
    if (this.noData()) { return; }
    if (this.currentSearch === '') {
      this.filteredIngredients = [];
      return;
    } 
    let customAlreadyAdded    = false;
    this.filteredIngredients  = this.baseIngredients.filter(
      (ingredient: SuggestedIngredient) => {
        if(ingredient.name === this.currentSearch) { customAlreadyAdded = true; }
        return ingredient.name.toLowerCase().startsWith(this.currentSearch.toLowerCase())
      }
    );
    if(!customAlreadyAdded) { // adding custom element
      this.filteredIngredients.unshift(
        {name: this.currentSearch, unit:'pièce', defaultQuantity: 1, autoAdd: false,selected: false, isCustom: true}
      );
    }
    // marking the selected elements
    this.filteredIngredients.map(
      (element: SuggestedIngredient) => element.selected = this.selectedIngredients.some(
        (ingredient: RequestedIngredient) => element.name == ingredient.name
      )
    );
    this.filteredIngredients.sort();
  }

  addIngredientToList(ingredient: SuggestedIngredient): void {
    if(ingredient.selected) { return; } // no duplicates
    this.selectedIngredients.push(createRequestedIngredient(ingredient));
    this.currentSearch        = '';
    this.filteredIngredients  = [];
  }

  removeIngredientFromList(nameToRemove: string): void {
    this.selectedIngredients = this.selectedIngredients.filter((ingredient: RequestedIngredient) => ingredient.name != nameToRemove);
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

  private displayToast(message: string): void {
    this.toastOnError.nativeElement.querySelector('.toast-body').textContent = message;
    const toast = new Toast(this.toastOnError.nativeElement, {});
    toast.show();
  }
}
