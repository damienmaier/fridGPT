import { BaseIngredient } from "../models/ingredient";

export class RecipesService {
    // to remove later when the endpoint is ready
    private fakeIngredients: BaseIngredient[] = [ 
        { "name": "Farine", "unit": "grammes" },
        { "name": "Sucre", "unit": "grammes" },
        { "name": "Sel", "unit": "grammes" },
        { "name": "Beurre", "unit": "kilogramme" },
        { "name": "Œufs", "unit": "unité" },
        { "name": "Lait", "unit": "litre" },
        { "name": "Levure chimique", "unit": "grammes" },
        { "name": "Huile d'olive", "unit": "millilitre" },
        { "name": "Pâtes", "unit": "grammes" },
        { "name": "Riz", "unit": "grammes" },
        { "name": "Céréales", "unit": "grammes" },
        { "name": "Yaourt", "unit": "unité" },
        { "name": "Fromage", "unit": "grammes" },
        { "name": "Jambon", "unit": "grammes" },
        { "name": "Poulet", "unit": "grammes" },
        { "name": "Thon en conserve", "unit": "grammes" },
        { "name": "Légumes surgelés", "unit": "grammes" },
        { "name": "Fruits frais", "unit": "grammes" },
        { "name": "Café moulu", "unit": "grammes" },
        { "name": "Thé", "unit": "grammes" },
        { "name": "Sucre roux", "unit": "grammes" },
        { "name": "Chocolat noir", "unit": "grammes" },
        { "name": "Épices", "unit": "grammes" }
    ]

    getIngredients(): BaseIngredient[] {
        return this.fakeIngredients; // to be modified later when the endpoint is ready
    }
}