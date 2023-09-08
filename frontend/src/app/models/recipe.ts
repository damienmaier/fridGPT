/**
 * represents a virtual coach of the app
 */
export interface Coach {
    name: string;
    description: string;
    imageUrl: string;
}

/**
 * represents a generated recipe from the API
 */
export interface Recipe {
    dishName: string;
    dishDescription: string;
    ingredients: string;
    steps: string[];
    imageUrl: string;
    coach: Coach;
}
