import { Recipe } from "./recipe";
import { SuggestedIngredient } from "./suggested-ingredient";

export interface RecipeResponse {
    recipes: Recipe[];
}

export interface SuggestedIngredientResponse {
    ingredients: SuggestedIngredient[];
}