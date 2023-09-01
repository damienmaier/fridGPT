interface SuggestedIngredientAPI {
    name: string;
    unit: string;
    defaultQuantity: number;
    autoAdd: boolean;
}

interface SuggestedIngredient extends SuggestedIngredientAPI {
    selected: boolean;
    isCustom: boolean;
}

export { SuggestedIngredient, SuggestedIngredientAPI }