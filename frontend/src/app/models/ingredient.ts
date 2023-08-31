export interface Ingredient {
    selected: boolean; // generated & used by frontend only
    isCustom: boolean // generated & used by frontend only
    name: string;
    unit: string;
    defaultQuantity: number;
    autoAdd: boolean;
}

interface IngredientQuantity {
    unit: string;
    value: number;
}

export class IngredientForRecipe {
    isCustom: boolean // generated & used by frontend only
    name!: string;
    quantity!: IngredientQuantity;
    withQuantity!: boolean;
    constructor(ingredient: Ingredient) {
        this.quantity       = {unit: ingredient.unit, value: ingredient.defaultQuantity};
        this.name           = ingredient.name;
        this.isCustom       = ingredient.isCustom;
        this.withQuantity   = false;
    }
}
