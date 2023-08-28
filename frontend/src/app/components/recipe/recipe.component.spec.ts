import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createRecipesServiceSpy } from 'src/tests/fake-services';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeComponent } from './recipe.component';
import { LoadingComponent } from '../loading/loading.component';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;
  let fakeRecipeService: RecipesService;

  beforeEach(async () => {
    fakeRecipeService = createRecipesServiceSpy();
    TestBed.configureTestingModule({
      declarations: [RecipeComponent, LoadingComponent],
      providers:    [{provide: RecipesService, useValue: fakeRecipeService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(RecipeComponent);
    component  = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
