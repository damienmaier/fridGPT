import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { RequestedIngredient, RequestedIngredientAPI } from './requested-ingredient';

@Injectable({
  providedIn: 'root',
})
/**
 * represents the ingredients we want to send to generate recipes with
 */
export class RequestedIngredientAdapter implements Adapter<RequestedIngredientAPI> {
  adapt(ingredient: RequestedIngredient): RequestedIngredientAPI {
    const ingredientToSend = {
        name: ingredient.name,
        mandatory: ingredient.mandatory,
        quantity: ingredient.quantity
    }
    if(!ingredient.displayQuantity) {
        delete ingredientToSend.quantity;
    }
    return ingredientToSend;
  }
}
