import { RecipesService } from "src/app/services/recipes.service";

function createRecipesServiceSpy() {
    return jasmine.createSpyObj<RecipesService>(
        'RecipesService',
        {
            getIngredients:[],
        }
    );
}

export { createRecipesServiceSpy };