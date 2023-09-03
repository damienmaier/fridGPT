import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap'
import { RecipesService } from 'src/app/services/recipes.service';
import { SuggestedIngredient } from 'src/app/models/suggested-ingredient';
import { RequestedIngredient } from 'src/app/models/requested-ingredient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnDestroy {
  private baseIngredients: SuggestedIngredient[]  = [];
  filteredIngredients: SuggestedIngredient[]      = [];
  selectedIngredients: RequestedIngredient[]      = [];
  ingredientsSub!: Subscription;
  currentSearch: string   = '';
  generateImages: boolean = false;
  @ViewChild('ErrorToast', {static: true}) toastOnError: any;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    const lastError = this.recipesService.fetchLastError();
    if(lastError != null) {
      this.displayToast(this.recipesService.buildErrorMessage());
      this.selectedIngredients = lastError.lastIngredients;
    }
    this.ingredientsSub = this.recipesService.loadIngredients().subscribe(
      (list: SuggestedIngredient[]) => {
        this.baseIngredients = list;
        if(this.selectedIngredients.length == 0) {
          this.baseIngredients.forEach((ingredient: SuggestedIngredient) => {
            if(ingredient.autoAdd) { this.addIngredientToList(ingredient); }
          });
        }
      }
    );
  }

  startloadingRecipes(): void {
    if(this.selectedIngredients.length === 0) {
      this.displayToast('Veuillez ajouter au moins un ingrédient');
    } else {
      this.recipesService.startLoadingRecipe(this.selectedIngredients);
    }
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
      this.filteredIngredients.unshift( new SuggestedIngredient(this.currentSearch, 'pièce', false, 1, true));
    }
    this.filteredIngredients.map( // marking the selected elements
      (element: SuggestedIngredient) => element.selected = this.selectedIngredients.some(
        (ingredient: RequestedIngredient) => element.name == ingredient.name
      )
    );
    this.filteredIngredients.sort();
  }

  addIngredientToList(ingredient: SuggestedIngredient): void {
    if(ingredient.selected) { return; } // no duplicates
    this.selectedIngredients.push(ingredient.toRequestedIngredient());
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

  ngOnDestroy(): void {
    this.ingredientsSub.unsubscribe();
  }
}
