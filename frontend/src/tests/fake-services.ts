import { Subject } from "rxjs";
import { BaseIngredient } from "src/app/models/ingredient";
import { RecipesService } from "src/app/services/recipes.service";

function createRecipesServiceSpy() {
    const spyObj = jasmine.createSpyObj<RecipesService>('RecipesService', ['loadIngredients']);
    const fakeSubject = new Subject<BaseIngredient[]>();
    spyObj.ingredientsSubject = fakeSubject;
    return spyObj;
}

export { createRecipesServiceSpy };