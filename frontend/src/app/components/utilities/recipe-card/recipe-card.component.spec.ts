import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { ModalService } from 'src/app/services/modal.service';
import { createModalServiceSpy, createRecipesServiceSpy } from 'src/tests/fake-services';
import { RecipesService } from 'src/app/services/recipes.service';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let fakeModalService: ModalService;
  let fakeRecipeService: RecipesService;

  beforeEach(async () => {
    fakeModalService  = createModalServiceSpy();
    fakeRecipeService = createRecipesServiceSpy();
    TestBed.configureTestingModule({
      declarations: [RecipeCardComponent , RecipeCardComponent],
      providers: [
        {provide: RecipesService, useValue: fakeRecipeService},
        {provide: ModalService, useValue: fakeModalService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(RecipeCardComponent);
    component  = fixture.componentInstance;
    component.recipe = {dishName:'', dishDescription: '', ingredients: '',steps: [], imageUrl: '',
      coach: {name: '', description: '', imageUrl:''}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
