/**
 * used by the API when it sends the available ingredients to choose from when adding ingredients before loading recipes
 */
export interface SuggestedIngredientAPI {
    name: string;
    unit: string;
    autoAdd: boolean;
    defaultQuantity: number;
}

/**
 * used by the frontend to manipulate the available ingredients from the search list
 */
export class SuggestedIngredient implements SuggestedIngredientAPI {
    name!: string;
    unit!: string;
    autoAdd!: boolean;
    defaultQuantity!: number;
    selected!: boolean;
    isCustom!: boolean;
    constructor(name: string,unit: string, autoAdd: boolean, defaultQuantity: number, isCustom = false) {
        this.name     = name;
        this.unit     = unit;
        this.autoAdd  = autoAdd;
        this.defaultQuantity = defaultQuantity;
        this.selected = false;
        this.isCustom = isCustom;
    }

    toRequestedIngredient() {
        return {
            name: this.name, 
            mandatory: false,
            quantity: {value: this.defaultQuantity, unit: this.unit}, 
            isCustom: this.isCustom, 
            displayQuantity: false,
            isInvalid: false,
            isByDefault: this.autoAdd
        };
    }
}