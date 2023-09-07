import { RequestedIngredientAPI } from "./requested-ingredient";
import { RequestedRecipe } from "./requested-recipe";

/**
 * sent by the API when it encounters an error
 */
export interface APIError {
    info: {
        error: string; 
        ingredient?: RequestedIngredientAPI
    };
    lastRequest?:RequestedRecipe;
}