import { RequestedIngredientAPI } from "./requested-ingredient";

export interface APIError {
    error: string;
    ingredient?:RequestedIngredientAPI;
}