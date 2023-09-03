import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { SuggestedIngredient, SuggestedIngredientAPI } from "./suggested-ingredient";

@Injectable({
  providedIn: "root",
})
export class SuggestedIngredientAdapter implements Adapter<SuggestedIngredient> {
  adapt(item: SuggestedIngredientAPI): SuggestedIngredient {
    return new SuggestedIngredient(item.name, item.unit, item.autoAdd, item.defaultQuantity);
  }
}

