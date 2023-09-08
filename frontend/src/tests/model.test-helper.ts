import { Coach, Recipe } from "src/app/models/recipe";

export function createFakeRecipe():Recipe {
    return {
        "coach": createFakeCoach(), 
        "dishDescription": "Du rien en boîte, c'est tout", 
        "dishName": "Du rien en boîte", 
        "ingredients": "- 500g de rien", 
        "steps": ["Sortir le rien de la boîte."],
        imageUrl: '/assets_app/empty.jpg'
      };
}

export function createFakeCoach(): Coach {
    return {name: 'Germaine', description: 'Germaine, retraitée et cuisinière légendaire', imageUrl:''}
}