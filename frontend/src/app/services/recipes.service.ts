import { Subject } from "rxjs";
import { Ingredient } from "../models/ingredient";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { DishImage } from "../models/image";

interface IngredientsResponse {
    ingredients: Ingredient[]
}

@Injectable()
export class RecipesService {
    private currentlyLoadingRecipe: boolean = false;
    
    private recipe!: Recipe;
    recipeSubject: Subject<Recipe> = new Subject<Recipe>();

    private ingredientsList: Ingredient[] = [];
    ingredientsSubject: Subject<Ingredient[]> = new Subject<Ingredient[]>();

    constructor(private http: HttpClient) {}

    loadIngredients(): void {
        if(this.ingredientsList.length > 0) {
            // avoid reloading ingredients for nothing
            this.ingredientsSubject.next(this.ingredientsList.slice());
        } else {
            this.http.get<IngredientsResponse>('/api/ingredients').subscribe({
                next: (list: IngredientsResponse) => {
                    this.ingredientsList = list.ingredients;
                    this.ingredientsSubject.next(this.ingredientsList.slice());
                },
                error: (e:Error) => {
                    this.ingredientsList = [];
                    console.log(e);      
                }
            });
        }
    }

    loadRecipe(selection: Ingredient[], generateImages: boolean): void {
        this.currentlyLoadingRecipe = true;
        this.recipe                 = {dishDescription: '', instructions: '', image: { url: ''}};
        const params = {ingredients: selection.map((e) => e.strIngredient)};
        this.http.post<Recipe>('/api/recipe', params).subscribe({
            next: (sentRecipe: Recipe) => {
              this.recipe = sentRecipe;
              if(!generateImages) {
                this.recipe.image = {url: ''};
                this.emitRecipe(); // no images to load, only the recipe
                return;
              }
              // we load now the image
              this.http.post<DishImage>('/api/image', {dishDescription: this.recipe.dishDescription}).subscribe({
                next: (image: DishImage) => {
                    this.recipe.image = image;
                    this.emitRecipe();
                },
                error: (e:Error) => {
                    console.log(e); // todo: better error management
                    this.emitRecipe(true);
                }
              });
            },
            error: (e:Error) => {
                console.log(e); // todo: better error management
                this.emitRecipe(true);
            }
        });
    }

    recipeIsLoading(): boolean {
        return this.currentlyLoadingRecipe;
    }

    private emitRecipe(hasErrors: boolean = false): void {
        if(hasErrors) {
            this.recipe = {
                dishDescription: 'Aucune recette n\'a pu être chargée.', 
                instructions: 'Une erreur est survenue, veuillez recharger la page pour recommencer.', 
                image: {url: ''}
            }
        }
        this.recipeSubject.next(this.recipe);
        this.currentlyLoadingRecipe = false;
    }
}