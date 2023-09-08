import { RequestedIngredient } from './requested-ingredient';
import { RequestedIngredientAdapter } from './requested-ingredient-adapter';

interface DurationInput {
    hour: number,
    minute: number
}

/**
 * used by the frontend to store all the parameters to send to the API for it to generate recipes
 */
export class RequestedRecipe {
    ingredients: RequestedIngredient[];
    withImage: boolean;
    otherIngredientsAllowed: boolean;
    durationInput: DurationInput | null;
    personCount: number | null;
    difficulty: number | null;
    constructor() {
        this.withImage                  = false;
        this.otherIngredientsAllowed    = false;
        this.durationInput              = null;
        this.personCount                = null;
        this.difficulty                 = null;
        this.ingredients                = [];
    }
    
    /**
     * returns the correct recipe request format understood by the API
     * @param requestedIngredientAdapter method to format the ingredients to send to the API
     * @returns a structure describing a recipe request
     */
    APIFormat(requestedIngredientAdapter: RequestedIngredientAdapter): object {
        return {
            ingredients: this.ingredients.map(requestedIngredientAdapter.adapt),
            params: {
                difficulty: this.difficulty,
                duration: this.durationInputToHours(),
                personCount: this.personCount,
                otherIngredientsAllowed: this.otherIngredientsAllowed
            }
        }
    }

    /**
     * translates the duration into hours (for the API)
     * @returns a number of hours
     */
    private durationInputToHours(): number | null {
        return this.durationInput !== null ? (this.durationInput.hour + (this.durationInput.minute / 60)) : null;
    }
}