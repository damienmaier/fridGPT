import { RequestedIngredient } from "./requested-ingredient";
import { RequestedIngredientAdapter } from "./requested-ingredient-adapter";

interface DurationInput {
    hour: number,
    minute: number
}

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

    private durationInputToHours(): number | null {
        return this.durationInput !== null ? (this.durationInput.hour + (this.durationInput.minute / 60)) : null;
    }
}