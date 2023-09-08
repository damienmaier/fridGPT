import { Observable, Subject, catchError, forkJoin, map} from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';
import { SuggestedIngredientAdapter } from '../models/suggested-ingredient-adapter';
import { RequestedIngredientAdapter } from '../models/requested-ingredient-adapter';
import { SuggestedIngredient, SuggestedIngredientAPI } from '../models/suggested-ingredient';
import { APIError } from '../models/api-error';
import { DishImage } from '../models/image';
import { RequestedRecipe } from '../models/requested-recipe';

@Injectable()
export class RecipesService {
    // no direct access to data here
    private lastError: APIError|null    = null;
    private recipes: Recipe[]           = [];
    recipesSubject: Subject<Recipe[]>   = new Subject<Recipe[]>();
    private requestedRecipe!: RequestedRecipe;

    constructor(private http: HttpClient, private router: Router,
        private suggestedIngredientAdapter: SuggestedIngredientAdapter,
        private requestedIngredientAdapter: RequestedIngredientAdapter) {}

    /* --------- HTTP requests ------------------------------ */
    /**
     * @returns a list of ingredients to choose directly from
     */
    loadIngredients(): Observable<SuggestedIngredient[]> {
        return this.http.get<{ingredients: SuggestedIngredientAPI[]}>('/api/ingredients').pipe(
            map((data: {ingredients: SuggestedIngredientAPI[]}) => { 
                return data.ingredients.map(this.suggestedIngredientAdapter.adapt);
            }),
            catchError(() => []));
    }

    /**
     * @returns generates recipes based on the user requirements (ingredients, customization...)
     */
    loadRecipes(): void {
        if(this.recipes.length > 0) { 
            this.recipesSubject.next(this.recipes.slice());
            return;
        }
        if(this.requestedRecipe == undefined) {
            this.handleError({info: {error:''}});
            return;
        }
        const params = this.requestedRecipe.APIFormat(this.requestedIngredientAdapter);
        this.http.post<{recipes: Recipe[]}>('/api/recipe', params).subscribe({
            next: (response: {recipes: Recipe[]}) => {
                this.requestedRecipe.ingredients = [];
                this.recipes = response.recipes;
                if(this.requestedRecipe.withImage) {
                    this.loadRecipeImages();
                } else {
                    this.recipes.map((recipe: Recipe) => {
                        recipe.imageUrl = '/assets_app/empty.jpg';
                        return recipe;
                    });
                    this.recipesSubject.next(this.recipes.slice()); 
                }
            },
            error:(error: HttpErrorResponse) => {
                this.handleError({info: error.error, lastRequest: this.requestedRecipe});
            }
        });
    }

    /**
     * generates images for the already loaded recipes (need their descriptions)
     */
    loadRecipeImages(): void {
        const requests = this.recipes.map((recipe: Recipe) => this.http.post<DishImage>('/api/image', {dishDescription: recipe.dishDescription}));
        forkJoin(requests).subscribe({
            next: (results: DishImage[]) => {
                for(let i = 0; i < this.recipes.length; ++i) {
                    this.recipes[i].imageUrl = results[i].url;
                }
                this.recipesSubject.next(this.recipes.slice()); 
            },
            error:(error: HttpErrorResponse) => {
                this.handleError({info: error.error, lastRequest: this.requestedRecipe});
            }
        });
    }

    /**
     * stores the error and returns to the search component to start again
     * @param receivedError error from API
     */
    private handleError(receivedError: APIError): void {
        this.lastError = receivedError;
        this.goToHome();
        this.recipesSubject.next([]);
    }

    /**
     * triggers an API call that will reformulate a step
     * @param steps recipes's steps
     * @param stepIndex index of the step we are interested in
     * @returns a structure containing a more detailed explanation
     */
    loadHelpForStep(steps: string[], stepIndex: number): Observable<{helpText: string}> {
        return this.http.post<{helpText: string}>('/api/help', {steps, stepIndex});
    }

    /* --------- navigation related actions ------------------------------ */
    /**
     * triggers the navigation to the result component
     * @param recipe user requirements to give to the API for it to generate recipes
     */
    startLoadingRecipe(recipe: RequestedRecipe): void {
        this.requestedRecipe    = recipe;
        this.recipes            = [];
        this.router.navigate(['/app/result']);
    }

    /**
     * triggers the navigation to the recipe component
     * @param index recipe index
     */
    onRecipeSelected(index: number): void {
        this.router.navigate(['/app/recipe', index]);
    }

    /**
     * triggers the navigation to the search component
     */
    goToHome(): void {
        this.router.navigate(['/app']);
    }

    /* --------- other data requests from components ------------------------------ */
    /**
     * search a recipe based on its index
     * @param index recipe index
     * @returns a recipe
     */
    getRecipe(index: number): Recipe {
        if(!this.recipes || index == null || index < 0 || index >= this.recipes.length) {
            return {dishName:'',dishDescription:'',ingredients:'',steps:[],coach:{name:'',description:'',imageUrl:''},imageUrl:''};
        }
        return this.recipes[index];
    }

    fetchLastError(): APIError | null {
        return this.lastError;
    }

    /**
     * @returns a user friendly error message
     */
    buildAndDisposeOfErrorMessage(): string {
        if(this.lastError == null) { return ''; }
        let message = '';
        if(this.lastError.info.ingredient) {
            message = `Impossible de générer des recettes.\nL'ingrédient ${this.lastError.info.ingredient.name} est incorrect`;
        } else {
            switch(this.lastError.info.error) {
                case 'insufficient ingredients':
                    message = 'Les coachs jugent les ingrédients sélectionnés insuffisants pour générer des recettes convenables.\n Ajoutez des ingrédients supplémentaires.'
                    break;
                default:
                    message = 'Une erreur innatendue est survenue lors de la génération des recettes.\n Veuillez réessayer'
            }
        }
        this.lastError = null;
        return message;
    }
}
