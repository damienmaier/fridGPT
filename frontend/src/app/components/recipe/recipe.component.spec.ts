import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createModalServiceSpy, createRecipesServiceSpy } from 'src/tests/fake-services';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeComponent } from './recipe.component';
import { LoadingComponent } from '../loading/loading.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ModalService } from 'src/app/services/modal.service';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;
  let fakeRecipeService: RecipesService;
  let fakeModalService: ModalService;

  beforeEach(async () => {
    fakeRecipeService = createRecipesServiceSpy();
    fakeModalService  = createModalServiceSpy();
    TestBed.configureTestingModule({
      declarations: [RecipeComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: RecipesService, useValue: fakeRecipeService},
        {provide: ModalService, useValue: fakeModalService}
      ]
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
