import { Observable, Subject, map, tap } from "rxjs";
import { SuggestedIngredient, SuggestedIngredientAPI } from "../models/suggested-ingredient";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { RequestedIngredient } from "../models/requested-ingredient";
import { requestedIngredientForAPI } from "../models/translation-tool";
import { RecipeResponse, SuggestedIngredientResponse } from "../models/api-response";

@Injectable()
export class RecipesService {
    private recipes: Recipe[]                            = [];
    recipeSubject: BehaviorSubject<Recipe[]>             = new BehaviorSubject<Recipe[]>([]);

    private ingredientsList: SuggestedIngredient[]       = [];
    ingredientsSubject: Subject<SuggestedIngredient[]>   = new Subject<SuggestedIngredient[]>();

    constructor(private http: HttpClient, private router: Router) {}

    loadIngredients(): void {
        if(this.ingredientsList.length > 0) {
            this.ingredientsSubject.next(this.ingredientsList.slice());
            return;
        }
        this.http.get<SuggestedIngredientResponse>('/api/ingredients').subscribe({
            next: (response: SuggestedIngredientResponse) => {
                this.ingredientsList = response.ingredients.map((i: SuggestedIngredientAPI) => i as SuggestedIngredient);
            },
            error: ()    => this.ingredientsList = [],
            complete: () => this.ingredientsSubject.next(this.ingredientsList.slice())
        });
    }

    loadRecipe(selection: RequestedIngredient[], generateImages: boolean): Observable<void> {
        const params = { ingredients: selection.map(requestedIngredientForAPI) };
        this.recipes =  [];
        return this.http.post<RecipeResponse>('/api/recipe', params).pipe(map((
            (response: RecipeResponse) => {
              this.recipes = response.recipes;
              if(!generateImages) {
                
                this.onRecipesLoaded();
              } // TODO : LOAD IMAGES
            }
            // error case managed in component
        )));
    }

    onRecipesLoaded(): void {
        this.recipeSubject.next(this.recipes.slice());
        this.router.navigate(['/app/result']);
    }

    onRecipeSelected(index: number): void {
        this.router.navigate(['/app/recipe', index]);
    }

    getRecipe(index: number): (Recipe | null) {
        if(!this.recipes || index == null || index < 0 || index >= this.recipes.length) {
            return null;
        }
        return this.recipes[index];
    }

    goToHome(): void {
        this.router.navigate(['/app']);
    }
}
