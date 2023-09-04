import { Observable, catchError, forkJoin, map, of } from "rxjs";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { Router } from "@angular/router";
import { SuggestedIngredientAdapter } from "../models/suggested-ingredient-adapter";
import { RequestedIngredientAdapter } from "../models/requested-ingredient-adapter";
import { SuggestedIngredient, SuggestedIngredientAPI } from "../models/suggested-ingredient";
import { RequestedIngredient } from "../models/requested-ingredient";
import { APIError } from "../models/api-error";
import { DishImage } from "../models/image";

@Injectable()
export class RecipesService {
    // no direct access to data here
    private lastError: APIError|null = null;
    private recipes: Recipe[] = [];
    private ingredients: RequestedIngredient[] = [];
    loadImages: boolean = false;

    constructor(private http: HttpClient, private router: Router,
        private suggestedIngredientAdapter: SuggestedIngredientAdapter,
        private requestedIngredientAdapter: RequestedIngredientAdapter) {}

    /* --------- HTTP requests ------------------------------ */
    loadIngredients(): Observable<SuggestedIngredient[]> {
        return this.http.get<{ingredients: SuggestedIngredientAPI[]}>('/api/ingredients').pipe(
            map((data: {ingredients: SuggestedIngredientAPI[]}) => { 
                return data.ingredients.map(this.suggestedIngredientAdapter.adapt);
            }),
            catchError(err => []));
    }

    loadRecipes(): Observable<Recipe[]> {
        if(this.recipes.length > 0) { return of(this.recipes)}
        this.recipes = [];
        const params = { ingredients: this.ingredients.map(this.requestedIngredientAdapter.adapt) };
        return this.http.post<{recipes: Recipe[]}>('/api/recipe', params).pipe(map((
            (response: {recipes: Recipe[]}) => {
                this.ingredients    = [];
                this.recipes        = response.recipes;
                return response.recipes;
            }
        )),
        catchError((error: HttpErrorResponse) => {
            this.lastError = {info: error.error, lastIngredients: this.ingredients.slice()};
            this.goToHome();
            return [];
        }));
    }

    loadRecipeImages(dishDescriptions: string[]): Observable<string[]> {
        if(!this.loadImages) {
            return of(dishDescriptions.map(() => '/assets_app/empty.jpg'));
        }
        return forkJoin(dishDescriptions.map((description) => this.http.post<DishImage>('/api/image', {dishDescription: description})
            .pipe(map((response: DishImage) => response.url))));
    }

    loadHelpForStep(steps: string[], stepIndex: number): Observable<{recipes: Recipe[]}> {
        return this.http.post<{recipes: Recipe[]}>('/api/help', {steps, stepIndex});
    }

    /* --------- navigation related actions ------------------------------ */
    startLoadingRecipe(ingredients: RequestedIngredient[]): void {
        this.ingredients = ingredients;
        this.recipes     = [];
        this.router.navigate(['/app/result']);
    }

    onRecipeSelected(index: number): void {
        this.router.navigate(['/app/recipe', index]);
    }

    goToHome(): void {
        this.router.navigate(['/app']);
    }

    /* --------- other data requests from components ------------------------------ */
    getRecipe(index: number): Recipe {
        if(!this.recipes || index == null || index < 0 || index >= this.recipes.length) {
            return {dishName:'',dishDescription:'',ingredients:'',steps:[],coach:{name:'',description:'',imageUrl:''},imageUrl:''};
        }
        return this.recipes[index];
    }

    fetchLastError(): APIError | null {
        return this.lastError;
    }

    buildErrorMessage(): string {
        if(this.lastError == null) { return ''; }
        let message = '';
        if(this.lastError.info.ingredient) {
            message = `Impossible de générer des recettes, L'ingrédient ${this.lastError.info.ingredient.name} est incorrect`;
        } else {
            if(this.lastError.info.error ===  'insufficient ingredients') {
                message = 'Impossible de générer des recettes à partir des ingrédients sélectionnés, veuillez compléter la liste.'
            } else {
                message = 'Une erreur innatendue est survenue lors de la génération des recettes, veuillez réessayer'
            }
        }
        this.lastError = null;
        return message;
    }
}
