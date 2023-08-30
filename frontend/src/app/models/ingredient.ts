export interface Ingredient {
    id: number; // generated & used by frontend only
    selected: boolean; // generated & used by frontend only
    name: string;
    unit: string;
    defaultQuantity: number;
    autoAdd: boolean;
}
