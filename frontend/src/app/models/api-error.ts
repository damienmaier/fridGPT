import { RequestedIngredient, RequestedIngredientAPI } from "./requested-ingredient";

export interface APIError {
    info: {
        error: string; ingredient?: RequestedIngredientAPI
    };
    lastIngredients:RequestedIngredient[];
}