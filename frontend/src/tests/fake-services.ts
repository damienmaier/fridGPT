import { Subject, of } from "rxjs";
import { ModalService } from "src/app/services/modal.service";
import { RecipesService } from "src/app/services/recipes.service";
import { ToastService } from "src/app/services/toast.service";

function createRecipesServiceSpy() {
    const spyObj = jasmine.createSpyObj<RecipesService>('RecipesService', 
    ['loadIngredients', 'loadRecipes', 'loadRecipeImages', 'loadHelpForStep',
    'startLoadingRecipe', 'onRecipeSelected', 'goToHome', 'getRecipe', 'fetchLastError', 'buildErrorMessage']);
    spyObj.loadIngredients.and.returnValue(of([]));
    spyObj.loadRecipes.and.returnValue(of([]));
    spyObj.getRecipe.and.returnValue({dishName:'',dishDescription:'',ingredients:'',steps:[],coach:{name:'',description:'',imageUrl:''},imageUrl:''});
    return spyObj;
}

function createModalServiceSpy() {
    const spyObj  = jasmine.createSpyObj<ModalService>('ModalService', 
    ['openCoachModal', 'openHelpModal']);
    spyObj.openHelpModal.and.returnValue(of());
     return spyObj;
}

function createToastServiceSpy() {
    const spyObj  = jasmine.createSpyObj<ToastService>('ToastService', 
    ['show', 'remove']);
    spyObj.toastSubject = new Subject<string[]>();
     return spyObj;
}

export { createRecipesServiceSpy, createModalServiceSpy, createToastServiceSpy };