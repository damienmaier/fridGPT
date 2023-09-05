import { Component, OnDestroy } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { SuggestedIngredient } from 'src/app/models/suggested-ingredient';
import { RequestedIngredient } from 'src/app/models/requested-ingredient';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { RequestedRecipe } from 'src/app/models/requested-recipe';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(200, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnDestroy {
  private baseIngredients: SuggestedIngredient[]  = [];
  filteredIngredients: SuggestedIngredient[]      = [];
  currentSearch: string                           = '';
  ingredientsSub!: Subscription;
  requestedRecipe!: RequestedRecipe;

  constructor(private recipesService: RecipesService, public toastService: ToastService) {}

  ngOnInit() {
    const error = this.recipesService.fetchLastError();
    this.requestedRecipe = (error != null && error.lastRequest) ? error.lastRequest : new RequestedRecipe();
    if(error != null && error.info.error != '') {
      this.toastService.show(this.recipesService.buildAndDisposeOfErrorMessage());
      if(error.info.ingredient) {
        this.requestedRecipe.ingredients.map((ingredient: RequestedIngredient) => {
          if(ingredient.name === error.info.ingredient?.name) {
            ingredient.isInvalid = true;
          }
        });
      }
    }
    this.ingredientsSub = this.recipesService.loadIngredients().subscribe(
      (list: SuggestedIngredient[]) => {
        this.baseIngredients = list;
        if(this.requestedRecipe.ingredients.length == 0) {
          this.baseIngredients.forEach((ingredient: SuggestedIngredient) => {
            if(ingredient.autoAdd) { this.addIngredientToList(ingredient); }
          });
        }
      }
    );
  }

  startloadingRecipes(): void {
    if(this.requestedRecipe.ingredients.length === 0) {
      this.toastService.show('Veuillez ajouter au moins un ingrédient');
    } else {
      this.recipesService.startLoadingRecipe(this.requestedRecipe);
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
        if(ingredient.name.toLowerCase() === this.currentSearch.toLowerCase()) { customAlreadyAdded = true; }
        return ingredient.name.toLowerCase().startsWith(this.currentSearch.toLowerCase())
      }
    );
    if(!customAlreadyAdded) { // adding custom element
      this.filteredIngredients.unshift( new SuggestedIngredient(this.currentSearch, 'pièce', false, 1, true));
    }
    this.filteredIngredients.map( // marking the selected elements
      (element: SuggestedIngredient) => element.selected = this.requestedRecipe.ingredients.some(
        (ingredient: RequestedIngredient) => element.name == ingredient.name
      )
    );
    this.filteredIngredients.sort((e1:SuggestedIngredient,e2:SuggestedIngredient) => e1.name > e2.name ? 1 : -1);
  }

  addIngredientToList(ingredient: SuggestedIngredient): void {
    if(ingredient.selected) { return; } // no duplicates
    this.requestedRecipe.ingredients.unshift(ingredient.toRequestedIngredient());
    this.currentSearch        = '';
    this.filteredIngredients  = [];
  }

  removeIngredientFromList(nameToRemove: string): void {
    this.requestedRecipe.ingredients = this.requestedRecipe.ingredients.filter((ingredient: RequestedIngredient) => ingredient.name != nameToRemove);
  }

  noData(): boolean {
    return this.baseIngredients.length <= 0;
  }

  searchListHeight(): string {
    if(this.requestedRecipe.ingredients.length <= 7) {
      return (window.screen.height * 0.4 - this.requestedRecipe.ingredients.length * 34) + 'px';
    } else {
      return window.screen.height * 0.2 + 'px';
    }
  }

  ngOnDestroy(): void {
    this.ingredientsSub.unsubscribe();
  }

  flipValue<T>(currentValue: T|null, defaultValue: T): T | null {
    return currentValue == null ? defaultValue : null;
  }
}
