import { SuggestedIngredient } from "./suggested-ingredient";
import { RequestedIngredient, RequestedIngredientAPI } from "./requested-ingredient";

function createRequestedIngredient(ingredient: SuggestedIngredient): RequestedIngredient {
    return {
        name: ingredient.name, 
        quantity: {value: ingredient.defaultQuantity, unit:ingredient.unit}, 
        isCustom: ingredient.isCustom, 
        displayQuantity: ingredient.isCustom
    };
}

function requestedIngredientForAPI(ingredient: RequestedIngredient): RequestedIngredientAPI {
    let ingredientToSend = {
        name: ingredient.name,
        quantity: ingredient.quantity
    }
    if(!ingredient.displayQuantity) {
        delete ingredientToSend.quantity;
    }
    return ingredientToSend;
}

export {createRequestedIngredient, requestedIngredientForAPI }