export interface BaseIngredient {
    name: string;
}
export interface Ingredient {
    id: number;
    baseIngredient: BaseIngredient;
}