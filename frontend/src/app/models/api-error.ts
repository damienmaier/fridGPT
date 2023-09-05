import { RequestedIngredientAPI } from "./requested-ingredient";
import { RequestedRecipe } from "./requested-recipe";

export interface APIError {
    info: {
        error: string; 
        ingredient?: RequestedIngredientAPI
    };
    lastRequest?:RequestedRecipe;
}