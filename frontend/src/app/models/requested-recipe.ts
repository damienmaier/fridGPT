import { RequestedIngredient } from './requested-ingredient';
import { RequestedIngredientAdapter } from './requested-ingredient-adapter';

/**
 * represents a duration, used by the input
 */
interface DurationInput {
    hour: number,
    minute: number
}

/**
 * used by the frontend to store all the parameters to send to the API when we want to generate a recipe
 */
export class RequestedRecipe {
    ingredients: RequestedIngredient[];
    otherIngredientsAllowed: boolean;
    // null parameters means that GPT will be given no constraints regarding these information
    durationInput: DurationInput | null;
    personCount: number | null;
    difficulty: number | null;
    constructor() {
        this.otherIngredientsAllowed = false;
        this.durationInput           = null;
        this.personCount             = null;
        this.difficulty              = null;
        this.ingredients             = [];
    }
    
    /**
     * returns a recipe request to send to the API when we want to generate a recipe
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
     * translates the duration from input into a number of hours (for the API)
     * @returns a number of hours
     */
    private durationInputToHours(): number | null {
        return this.durationInput !== null ? (this.durationInput.hour + (this.durationInput.minute / 60)) : null;
    }
}