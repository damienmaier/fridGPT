import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Coach, Recipe } from 'src/app/models/recipe';
import { ModalService } from 'src/app/services/modal.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  recipe!: Recipe;
  currentStep: string = '';
  currentStepIndex!: number;
  loadingHelp: boolean = false;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private modalService: ModalService) {}

  ngOnInit() {
    this.recipe = {
      "coach": {
          "description": "Germaine, une retrait\u00e9e pleine de vie, enchante sa cuisine de couleurs et de sourires en concoctant des d\u00e9lices pour ses petits-enfants. \nToujours \u00e0 la recherche de nouvelles recettes, elle transforme chaque repas en une aventure gourmande, pr\u00eate \u00e0 rire de ses \u00e9checs et \u00e0 partager des moments savoureux avec sa famille.\nSa cuisine est un voyage joyeux o\u00f9 chaque plat raconte une histoire et chaque bouch\u00e9e r\u00e9v\u00e8le sa passion pour faire plaisir aux autres.",
           "imageUrl": "/assets_app/germaine.png","name": "Germaine"
      },
      "dishDescription": "Un d\u00e9licieux plat traditionnel fran\u00e7ais \u00e0 base de b\u0153uf, de vin rouge et d'\u00e9pices.",
      "dishName": "Boeuf bourguignon",
      "ingredients": "- 500g de b\u0153uf\n- 50g de farine\n- 1 cuill\u00e8re \u00e0 caf\u00e9 de poivre\n- 1 cuill\u00e8re \u00e0 caf\u00e9 de sel\n- 1 cuill\u00e8re \u00e0 soupe de sucre\n- Huile d'olive\n- Huile de cuisson\n- Vinaigre\n- Armoire \u00e0 \u00e9pices compl\u00e8te",
      "steps": [
          "1. Couper le b\u0153uf en cubes de taille moyenne.","2. Dans un sac plastique, m\u00e9langer la farine, le poivre, le sel et le sucre.",
      ],
      imageUrl: '/assets_app/empty.jpg'
    };
    this.currentStep        = this.recipe.ingredients;
    this.currentStepIndex   = this.recipe.steps.length;
    this.recipe.ingredients = this.recipe.ingredients.replaceAll('\n', '<br>'); 

    // const index             = this.route.snapshot.paramMap.get('recipeId');
    // this.recipe             = this.recipeService.getRecipe(index == null ? -1 : +index);
    // this.currentStep        = this.recipe.ingredients;
    // this.currentStepIndex   = this.recipe.steps.length;
    // if(this.recipe.dishName === '') {
    //   this.recipeService.goToHome(); // no recipes loaded, go back to home screen
    // }
    // this.recipe.ingredients = this.recipe.ingredients.replaceAll('\n', '<br>'); 
  }

  nextStep(forward: boolean) {
    this.currentStepIndex = (this.currentStepIndex + (forward ? 1 : -1)) % (this.recipe.steps.length + 1);
    if (this.currentStepIndex < 0) {
      this.currentStepIndex += this.recipe.steps.length + 1;
    }
    this.currentStep = this.currentStepIndex == this.recipe.steps.length ? 
      this.recipe.ingredients : this.recipe.steps[this.currentStepIndex];
  }

  openCoachModal(): void {
    this.modalService.openCoachModal(this.recipe.coach);
  }

  openHelpModal(): void {
    this.loadingHelp = true;
    this.modalService.openHelpModal(this.recipe.steps, this.currentStepIndex).subscribe(
      () => { this.loadingHelp = false; }
    )
  }
}
