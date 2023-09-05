import { Component, OnDestroy } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { SuggestedIngredient } from 'src/app/models/suggested-ingredient';
import { RequestedIngredient } from 'src/app/models/requested-ingredient';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnDestroy {
  private baseIngredients: SuggestedIngredient[]  = [];
  filteredIngredients: SuggestedIngredient[]      = [];
  selectedIngredients: RequestedIngredient[]      = [];
  currentSearch: string                           = '';
  ingredientsSub!: Subscription;

  constructor(private recipesService: RecipesService, public toastService: ToastService) {}

  ngOnInit() {
    const lastError = this.recipesService.fetchLastError();
    this.selectedIngredients.map((ingredient: RequestedIngredient) => ingredient.isInvalid = false);
    if(lastError != null) {
      this.toastService.show(this.recipesService.buildErrorMessage());
      this.selectedIngredients = lastError.lastIngredients;
      if(lastError.info.ingredient) {
        this.selectedIngredients.map((ingredient: RequestedIngredient) => {
          if(ingredient.name === lastError.info.ingredient?.name) {
            ingredient.isInvalid = true;
          }
        })
      }
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
      this.toastService.show('Veuillez ajouter au moins un ingrédient');
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
        if(ingredient.name.toLowerCase() === this.currentSearch.toLowerCase()) { customAlreadyAdded = true; }
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
    this.filteredIngredients.sort((e1:SuggestedIngredient,e2:SuggestedIngredient) => e1.name > e2.name ? 1 : -1);
  }

  addIngredientToList(ingredient: SuggestedIngredient): void {
    if(ingredient.selected) { return; } // no duplicates
    this.selectedIngredients.unshift(ingredient.toRequestedIngredient());
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

  toggleImageLoading(event:any) {
    this.recipesService.loadImages = event.target != null ? event.target.checked : false;
  }

  ngOnDestroy(): void {
    this.ingredientsSub.unsubscribe();
  }
}
