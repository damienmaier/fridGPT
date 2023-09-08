import { RequestedIngredient } from "./requested-ingredient";

/**
 * represents a ingredient sent by the API to choose in order to create our ingredients list
 */
export interface SuggestedIngredientAPI {
    name: string;
    unit: string;
    autoAdd: boolean;
    defaultQuantity: number;
}

/**
 * used by the frontend to manipulate an ingredient sent by the API (we add frontend related information)
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

    /**
     * used when we add an ingredient sent by the API in our requested ingredients list
     * @returns a requested ingredient
     */
    toRequestedIngredient(): RequestedIngredient {
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