import { RequestedIngredientAPI } from './requested-ingredient';
import { RequestedRecipe } from './requested-recipe';

/**
 * sent by the API when it needs to return an error
 */
export interface APIError {
    info: {
        error: string; 
        ingredient?: RequestedIngredientAPI // optional invalid requested ingredient
    };
    lastRequest?: RequestedRecipe; // last recipe request that failed
}