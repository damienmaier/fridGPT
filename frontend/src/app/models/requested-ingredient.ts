/**
 * represents a ingredient that can be sent to the API to generate a recipe with
 */
export interface RequestedIngredientAPI {
    name: string;
    mandatory: boolean;
    quantity?: {value: number, unit: string},
}
  
/**
 * used by the frontend to manipulate a requested ingredient for the future recipes to generate
 */
export interface RequestedIngredient extends RequestedIngredientAPI {
    isCustom: boolean;
    displayQuantity: boolean;
    isInvalid: boolean;
    isByDefault: boolean;
}
