import { DishImage } from "./image";

export interface Recipe {
    dishDescription: string;
    instructions: string;
    image: DishImage;
}