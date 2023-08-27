export interface BaseIngredient {
    name: string;
    unit: string;
}
export interface Ingredient {
    id: number;
    baseIngredient: BaseIngredient;
    quantity: number;
}