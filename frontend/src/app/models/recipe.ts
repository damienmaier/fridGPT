export interface Coach {
    name: string;
    description: string;
    imageUrl: string;
}

export interface Recipe {
    dishName: string;
    dishDescription: string;
    ingredients: string;
    steps: string[];
    imageUrl: string;
    coach: Coach;
}
