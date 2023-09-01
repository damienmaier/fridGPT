interface IngredientQuantity {
    unit: string;
    value: number;
}

export interface RequestedIngredientAPI {
    name: string;
    quantity?: IngredientQuantity;
}

export interface RequestedIngredient extends RequestedIngredientAPI {
    isCustom: boolean;
    displayQuantity: boolean;
}

