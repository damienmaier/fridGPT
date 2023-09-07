import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from './result.component';
import { createModalServiceSpy, createRecipesServiceSpy } from 'src/tests/fake-services';
import { RecipesService } from 'src/app/services/recipes.service';
import { ModalService } from 'src/app/services/modal.service';
import { LoadingComponent } from '../utilities/loading/loading.component';
import { RecipeCardComponent } from '../utilities/recipe-card/recipe-card.component';
import { RotatingImageComponent } from '../utilities/rotating-image/rotating-image.component';
import { Recipe } from 'src/app/models/recipe';
import { createFakeRecipe } from 'src/tests/model.test-helper';
import { findAllElements } from 'src/tests/main.test-helper';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let fakeRecipeService: RecipesService;
  let fakeModalService: ModalService;
  const recipe: Recipe = createFakeRecipe();

  beforeEach(async () => {
    fakeRecipeService = createRecipesServiceSpy();
    fakeModalService = createModalServiceSpy();
    TestBed.configureTestingModule({
      declarations: [ResultComponent, LoadingComponent , RecipeCardComponent, RotatingImageComponent],
      providers: [ {provide: RecipesService, useValue: fakeRecipeService},
        {provide: ModalService, useValue: fakeModalService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(ResultComponent);
    component  = fixture.componentInstance;
    component.recipes = [recipe];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display one recipe card component', () => {
    expect(findAllElements(fixture, '.box').length).toBe(1);
  });
});
