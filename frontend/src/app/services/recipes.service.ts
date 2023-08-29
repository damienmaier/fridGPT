import { Subject } from "rxjs";
import { BaseIngredient, Ingredient } from "../models/ingredient";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { DishImage } from "../models/image";

@Injectable()
export class RecipesService {
    private currentlyLoadingRecipe: boolean = false;
    // to remove later when the endpoint is ready
    private fakeIngredients: BaseIngredient[] = [ 
        { "name": "Farine" },
        { "name": "Sucre" },
        { "name": "Sel" },
        { "name": "Beurre" },
        { "name": "Œufs" },
        { "name": "Lait" },
        { "name": "Levure chimique" },
        { "name": "Huile d'olive" },
        { "name": "Pâtes" },
        { "name": "Riz" },
        { "name": "Céréales" },
        { "name": "Yaourt" },
        { "name": "Fromage" },
        { "name": "Jambon" },
        { "name": "Poulet" },
        { "name": "Thon en conserve" },
        { "name": "Légumes surgelés" },
        { "name": "Fruits frais" },
        { "name": "Café moulu" },
        { "name": "Thé" },
        { "name": "Sucre roux" },
        { "name": "Saumon" },
        { "name": "Salami de boeuf" },
        { "name": "Surimi" },
        { "name": "Sel marin" },
        { "name": "Sole" },
        { "name": "Chocolat noir" },
        { "name": "Épices" }
    ]
    ingredientsSubject: Subject<BaseIngredient[]> = new Subject<BaseIngredient[]>();

    recipe!: Recipe;
    recipeSubject: Subject<Recipe> = new Subject<Recipe>();

    constructor(private http: HttpClient) {}

    loadIngredients(): void {
        // to be modified later when the endpoint is ready
        this.ingredientsSubject.next(this.fakeIngredients.slice());
    }

    loadRecipe(selection: Ingredient[]): void {
        this.currentlyLoadingRecipe = true;
        this.recipe                 = {dishDescription: '', instructions: '', image: { url: ''}};
        const params = {ingredients: selection.map((e) => e.baseIngredient.name)};
        this.http.post<Recipe>('/api/recipe', params).subscribe({
            next: (sentRecipe: Recipe) => {
              this.recipe = sentRecipe;
              // we load now the image
              this.http.post<DishImage>('/api/image', {dishDescription: this.recipe.dishDescription}).subscribe({
                next: (image: DishImage) => {
                    this.recipe.image = image;
                    this.emitRecipe();
                },
                error: (e) => {
                    console.log(e); // todo: better error management
                    this.emitRecipe(true);
                }
              });
            },
            error: (e) => {
                console.log(e); // todo: better error management
                this.emitRecipe(true);
            }
        });
    }

    private emitRecipe(error: boolean = false) {
        if(error) {
            this.recipe.dishDescription = 'no data loaded';
        }
        this.recipeSubject.next(this.recipe);
        this.currentlyLoadingRecipe = false;
    }

    recipeIsLoading(): boolean {
        return this.currentlyLoadingRecipe;
    }
}