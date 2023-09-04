import { of } from "rxjs";
import { RecipesService } from "src/app/services/recipes.service";

function createRecipesServiceSpy() {
    const spyObj              = jasmine.createSpyObj<RecipesService>('RecipesService', 
    ['loadIngredients', 'fetchRecipes', 'onRecipeSelected','getRecipe','goToHome','fetchLastError']);
    spyObj.loadIngredients.and.returnValue(of([]));
    spyObj.fetchRecipes.and.returnValue(of([]));
    spyObj.getRecipe.and.returnValue({dishName:'',dishDescription:'',ingredients:'',steps:[],coach:{name:'',description:'',imageUrl:''},imageUrl:''});
    return spyObj;
}

export { createRecipesServiceSpy };