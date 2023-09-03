interface Coach {
    name: string;
    description: string;
    image_url: string;
}

export interface Recipe {
    dishName: string;
    dishDescription: string;
    ingredients: string;
    steps: string[];
    imageURL: string;
    coach: Coach;
}
