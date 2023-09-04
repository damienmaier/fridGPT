export interface RequestedIngredientAPI {
    name: string;
    quantity?: {value: number, unit: string},
}
  
export interface RequestedIngredient extends RequestedIngredientAPI {
    isCustom: boolean;
    displayQuantity: boolean;
    isInvalid: boolean;
}
