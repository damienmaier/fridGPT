import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { RecipesService } from 'src/app/services/recipes.service';
import { createRecipesServiceSpy } from 'src/tests/fake-services';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let fakeRecipeService: RecipesService;

  beforeEach(async () => {
    fakeRecipeService = createRecipesServiceSpy();
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports:      [FormsModule],
      providers:    [ {provide: RecipesService, useValue: fakeRecipeService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(SearchComponent);
    component  = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
