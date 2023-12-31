import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createModalServiceSpy, createRecipesServiceSpy } from 'src/tests/fake-services';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeComponent } from './recipe.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from 'src/app/services/modal.service';
import { RecipeCardComponent } from '../utilities/recipe-card/recipe-card.component';
import { Recipe } from 'src/app/models/recipe';
import { createFakeRecipe } from 'src/tests/model.test-helper';
import { click, findElement } from 'src/tests/main.test-helper';
import { RotatingImageComponent } from '../utilities/rotating-image/rotating-image.component';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;
  let fakeRecipeService: RecipesService;
  let fakeModalService: ModalService;
  const fakeRecipe: Recipe = createFakeRecipe();
  
  beforeEach(async () => {
    fakeRecipeService = createRecipesServiceSpy();
    fakeModalService  = createModalServiceSpy();
    TestBed.configureTestingModule({
      declarations: [RecipeComponent, RecipeCardComponent, RotatingImageComponent],
      imports:      [RouterTestingModule],
      providers:    [
        {provide: RecipesService, useValue: fakeRecipeService},
        {provide: ModalService, useValue: fakeModalService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture           = TestBed.createComponent(RecipeComponent);
    component         = fixture.componentInstance;
    component.recipe  = fakeRecipe;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an independent recipe card', () => {
    expect(findElement(fixture, 'recipe-card')).toBeTruthy();
  });

  it('should not display small screen parts', () => {
    try {
      findElement(fixture, 'small-screen-info');
    } catch(e: any) {
      expect(e.message).toBeTruthy();
    }
  });

  it('should display ingredients first only', () => {
    expect(findElement(fixture, 'ingredients').nativeElement.textContent).toContain(fakeRecipe.ingredients);
    try {
      findElement(fixture, 'step-content');
    } catch(e: any) {
      expect(e.message).toBeTruthy();
    }
  });

  it('should display the first step when we click on the right arrow', () => {
    click(fixture, 'right-arrow');
    fixture.detectChanges();
    expect(findElement(fixture, 'step-content').nativeElement.textContent).toContain(fakeRecipe.steps[0]);
  });

  it('should display the ingredients when we reach the end of the steps', () => {
    click(fixture, 'right-arrow');
    click(fixture, 'right-arrow');
    click(fixture, 'right-arrow');
    fixture.detectChanges();
    expect(findElement(fixture, 'ingredients').nativeElement.textContent).toContain(fakeRecipe.ingredients);
  });

  it('should display a help button that would trigger the help modal with the right parameters', () => {
    click(fixture, 'right-arrow');
    fixture.detectChanges();
    click(fixture, 'help-btn');
    fixture.detectChanges();
    expect(fakeModalService.openHelpModal).toHaveBeenCalledWith(fakeRecipe.steps, 0);
  });

  it('should display the last step when we click on the left arrow', () => {
    click(fixture, 'left-arrow');
    fixture.detectChanges();
    expect(findElement(fixture, 'step-content').nativeElement.textContent).toContain(fakeRecipe.steps[1]);
  });
});
