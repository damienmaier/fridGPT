import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { RequestedIngredient, RequestedIngredientAPI } from "./requested-ingredient";

@Injectable({
  providedIn: "root",
})
/**
 * used to format the ingredients we want to send to the API for it to generate recipes
 */
export class RequestedIngredientAdapter implements Adapter<RequestedIngredientAPI> {
  adapt(ingredient: RequestedIngredient): RequestedIngredientAPI {
    let ingredientToSend = {
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
