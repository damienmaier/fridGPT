/**
 * used to give the selected ingredients to the API in order to generate recipes
 */
export interface RequestedIngredientAPI {
    name: string;
    mandatory: boolean;
    quantity?: {value: number, unit: string},
}
  
/**
 * used by the frontend to manipulate selected ingredients for the future recipes
 */
export interface RequestedIngredient extends RequestedIngredientAPI {
    isCustom: boolean;
    displayQuantity: boolean;
    isInvalid: boolean;
    isByDefault: boolean;
}
