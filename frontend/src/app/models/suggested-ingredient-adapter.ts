import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { SuggestedIngredient, SuggestedIngredientAPI } from './suggested-ingredient';

@Injectable({
  providedIn: 'root',
})
/**
 * used when the API sends the available ingredients list and we translate them into our own custom objects to manipulate them
 */
export class SuggestedIngredientAdapter implements Adapter<SuggestedIngredient> {
  adapt(item: SuggestedIngredientAPI): SuggestedIngredient {
    return new SuggestedIngredient(item.name, item.unit, item.autoAdd, item.defaultQuantity);
  }
}

