import { Coach, Recipe } from 'src/app/models/recipe';
import { SuggestedIngredient } from 'src/app/models/suggested-ingredient';

export function createFakeRecipe():Recipe {
    return {
        coach: createFakeCoach(), 
        dishDescription: 'Du rien en boîte, c\'est tout', 
        dishName: 'Du rien en boîte', 
        ingredients: '- 500g de rien', 
        steps: ['Sortir le rien de la boîte.'],
        imageUrl: '/assets_app/empty.jpg'
      };
}

export function createFakeCoach(): Coach {
    return {name: 'Germaine', description: 'Germaine, retraitée et cuisinière légendaire', imageUrl:''}
}

export function createFakeSuggestedIngredientsList(): SuggestedIngredient[] {
    return [
        new SuggestedIngredient('poulet', 'kg', true, 1, false),
        new SuggestedIngredient('thon', 'kg', false, 3, false),
        new SuggestedIngredient('oeufs', 'pièce', false, 10, false)
    ]
}
