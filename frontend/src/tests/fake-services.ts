import { Subject } from "rxjs";
import { BaseIngredient } from "src/app/models/ingredient";
import { Recipe } from "src/app/models/recipe";
import { RecipesService } from "src/app/services/recipes.service";

function createRecipesServiceSpy() {
    const spyObj              = jasmine.createSpyObj<RecipesService>('RecipesService', ['loadIngredients', 'loadRecipe', 'recipeIsLoading']);
    spyObj.ingredientsSubject = new Subject<BaseIngredient[]>();
    spyObj.recipeSubject      = new Subject<Recipe>();
    return spyObj;
}

export { createRecipesServiceSpy };