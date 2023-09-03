import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { RequestedIngredient, RequestedIngredientAPI } from "./requested-ingredient";

@Injectable({
  providedIn: "root",
})
export class RequestedIngredientAdapter implements Adapter<RequestedIngredientAPI> {
  adapt(ingredient: RequestedIngredient): RequestedIngredientAPI {
    let ingredientToSend = {
        name: ingredient.name,
        quantity: ingredient.quantity
    }
    if(!ingredient.displayQuantity) {
        delete ingredientToSend.quantity;
    }
    return ingredientToSend;
  }
}


