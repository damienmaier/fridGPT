import { Subject, of } from "rxjs";
import { Recipe } from "src/app/models/recipe";
import { ModalService } from "src/app/services/modal.service";
import { RecipesService } from "src/app/services/recipes.service";
import { ToastContent, ToastService } from "src/app/services/toast.service";
import { createFakeRecipe, createFakeSuggestedIngredientsList } from "./model.test-helper";

function createRecipesServiceSpy() {
    const spyObj = jasmine.createSpyObj<RecipesService>('RecipesService', 
    ['loadIngredients', 'loadRecipes', 'loadRecipeImages', 'loadHelpForStep',
    'startLoadingRecipe', 'onRecipeSelected', 'goToHome', 'getRecipe', 'fetchLastError', 'buildAndDisposeOfErrorMessage']);
    spyObj.recipesSubject = new Subject<Recipe[]>();
    spyObj.loadIngredients.and.returnValue(of(createFakeSuggestedIngredientsList()));
    spyObj.loadRecipes.and.callFake(() => {
        spyObj.recipesSubject.next([createFakeRecipe()]);
    });
    spyObj.getRecipe.and.returnValue(createFakeRecipe());
    spyObj.loadHelpForStep.and.returnValue(of({helpText: 'help'}));
    return spyObj;
}

function createModalServiceSpy() {
    const spyObj  = jasmine.createSpyObj<ModalService>('ModalService', 
    ['openCoachModal', 'openHelpModal']);
    spyObj.openHelpModal.and.returnValue(of());
     return spyObj;
}

function createToastServiceSpy() {
    const spyObj  = jasmine.createSpyObj<ToastService>('ToastService', ['show', 'remove']);
    spyObj.toastSubject = new Subject<ToastContent[]>();
    spyObj.show.and.callFake(() => {
        spyObj.toastSubject.next([{ body: 'error', classNames: 'bg-danger text-light'}]);
    });
     return spyObj;
}

export { createRecipesServiceSpy, createModalServiceSpy, createToastServiceSpy };