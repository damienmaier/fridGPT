import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { ModalService } from 'src/app/services/modal.service';
import { createModalServiceSpy, createRecipesServiceSpy } from 'src/tests/fake-services';
import { RecipesService } from 'src/app/services/recipes.service';
import { createFakeRecipe } from 'src/tests/model.test-helper';
import { click, findElement } from 'src/tests/main.test-helper';
import { Recipe } from 'src/app/models/recipe';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let fakeModalService: ModalService;
  let fakeRecipeService: RecipesService;
  const fakeRecipe: Recipe = createFakeRecipe();

  beforeEach(async () => {
    fakeModalService  = createModalServiceSpy();
    fakeRecipeService = createRecipesServiceSpy();
    TestBed.configureTestingModule({
      declarations: [RecipeCardComponent , RecipeCardComponent],
      providers:    [
        {provide: RecipesService, useValue: fakeRecipeService},
        {provide: ModalService, useValue: fakeModalService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture               = TestBed.createComponent(RecipeCardComponent);
    component             = fixture.componentInstance;
    component.recipe      = fakeRecipe;
    component.selectable  = false;
    component.recipeId    = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dish name and the coach name', () => {
    expect(findElement(fixture, 'dish-name').nativeElement.textContent).toContain(fakeRecipe.dishName);
    expect(findElement(fixture, 'coach-name').nativeElement.textContent).toContain(` Proposé par ${fakeRecipe.coach.name}`);
  });

  it('should not redirect to recipe when clicking on it and should not have the selected class', () => {
    click(fixture, 'dish-img');
    fixture.detectChanges();
    expect(fakeRecipeService.onRecipeSelected).not.toHaveBeenCalled();
  });

  it('clicking on the coach should trigger the coach modal with the right parameters', () => {
    click(fixture, 'coach-description');
    fixture.detectChanges();
    expect(fakeModalService.openCoachModal).toHaveBeenCalledWith(fakeRecipe.coach);
  });
});
