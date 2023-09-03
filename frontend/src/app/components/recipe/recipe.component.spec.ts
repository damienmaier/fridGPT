import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createRecipesServiceSpy } from 'src/tests/fake-services';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeComponent } from './recipe.component';
import { LoadingComponent } from '../loading/loading.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;
  let fakeRecipeService: RecipesService;

  beforeEach(async () => {
    fakeRecipeService = createRecipesServiceSpy();
    TestBed.configureTestingModule({
      declarations: [RecipeComponent, LoadingComponent],
      imports: [RouterTestingModule],
      providers:    [{provide: RecipesService, useValue: fakeRecipeService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(RecipeComponent);
    component  = fixture.componentInstance;
    component.recipe = {dishName:'', dishDescription: '', ingredients: '',steps: [], imageUrl: '',
    coach: {name: '', description: '', imageUrl:''}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
