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
/**
 * Component that contains the ingredients selection, the recipe customization and a button to trigger the recipes generation 
**/
export class SearchComponent implements OnDestroy {
  private baseIngredients: SuggestedIngredient[]  = [];
  filteredIngredients: SuggestedIngredient[]      = [];
  currentSearch: string                           = '';
  ingredientsSub!: Subscription;
  requestedRecipe!: RequestedRecipe;
  isCollapsed: boolean = true;

  constructor(private recipesService: RecipesService, public toastService: ToastService) {}

  ngOnInit() {
    const error = this.recipesService.fetchLastError();
    this.requestedRecipe = (error != null && error.lastRequest) ? error.lastRequest : new RequestedRecipe();
    if(error != null && error.info.error != '') {
      this.toastService.show(this.recipesService.buildAndDisposeOfErrorMessage(),{ classname: 'bg-danger text-light'});
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

  /**
   * when the start button is pressed, a navigation will occur so we arrive to the result component where the recipes will be loaded
   */
  startloadingRecipes(): void {
    if(this.requestedRecipe.ingredients.length === 0) {
      this.toastService.show('Veuillez ajouter au moins un ingrédient');
    } else {
      this.recipesService.startLoadingRecipe(this.requestedRecipe);
    }
  }

  /**
   * is triggered when the user types something in the search bar
   */
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

  /**
   * is triggered when the user selects an item in the list under the search bar
   * @param ingredient new ingredient selected
   */
  addIngredientToList(ingredient: SuggestedIngredient): void {
    if(ingredient.selected) { return; } // no duplicates
    this.requestedRecipe.ingredients.unshift(ingredient.toRequestedIngredient());
    this.currentSearch        = '';
    this.filteredIngredients  = [];
  }

  /**
   * is triggered when the user clicks on the trash icon on one of the ingredient row in the ingredients selection table
   * @param nameToRemove ingredient name to remove
   */
  removeIngredientFromList(nameToRemove: string): void {
    this.requestedRecipe.ingredients = this.requestedRecipe.ingredients.filter((ingredient: RequestedIngredient) => ingredient.name != nameToRemove);
  }

  /**
   * true if no ingredients are loaded from the API (something must be wrong)
   * @returns the length of the loaded ingredients list
   */
  noData(): boolean {
    return this.baseIngredients.length <= 0;
  }

  /**
   * calculates the maximum height for the search list according to how many ingredients are already in the selected ingredients list displayed on top of the search bar
   * @returns a height in pixels
   */
  searchListHeight(): string {
    if(this.requestedRecipe.ingredients.length <= 7) {
      return (window.screen.height * 0.65 - this.requestedRecipe.ingredients.length * 34) + 'px';
    } else {
      return window.screen.height * 0.2 + 'px';
    }
  }

  /**
   * returns null if the current value is not null or the contrary
   * @param currentValue current parameter value
   * @param defaultValue value to use for the parameter
   * @returns 
   */
  flipValue<T>(currentValue: T|null, defaultValue: T): T | null {
    return currentValue == null ? defaultValue : null;
  }

  ngOnDestroy(): void {
    this.ingredientsSub.unsubscribe();
  }
}
