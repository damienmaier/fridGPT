export interface RequestedIngredientAPI {
    name: string;
    mandatory: boolean;
    quantity?: {value: number, unit: string},
}
  
export interface RequestedIngredient extends RequestedIngredientAPI {
    isCustom: boolean;
    displayQuantity: boolean;
    isInvalid: boolean;
    isByDefault: boolean;
}
