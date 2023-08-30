export interface Ingredient {
    selected: boolean; // generated & used by frontend only
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
    name!: string;
    quantity!: IngredientQuantity;
    constructor(name: string, unit: string, qty: number) {
        this.quantity   = {unit, value: qty};
        this.name       = name;
    }
}
