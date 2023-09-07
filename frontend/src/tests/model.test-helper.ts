import { Recipe } from "src/app/models/recipe";

export function createFakeRecipe():Recipe {
    return {
        "coach": {
            "description": "Germaine, une retrait\u00e9e pleine de vie, enchante sa cuisine de couleurs et de sourires en concoctant des d\u00e9lices pour ses petits-enfants. \nToujours \u00e0 la recherche de nouvelles recettes, elle transforme chaque repas en une aventure gourmande, pr\u00eate \u00e0 rire de ses \u00e9checs et \u00e0 partager des moments savoureux avec sa famille.\nSa cuisine est un voyage joyeux o\u00f9 chaque plat raconte une histoire et chaque bouch\u00e9e r\u00e9v\u00e8le sa passion pour faire plaisir aux autres.",
             "imageUrl": "/assets_app/germaine.png","name": "Germaine"
        }, 
        "dishDescription": "Du rien en boîte, c'est tout", 
        "dishName": "Du rien en boîte", 
        "ingredients": "- 500g de rien", 
        "steps": ["Sortir le rien de la boîte."],
        imageUrl: '/assets_app/empty.jpg'
      };
}