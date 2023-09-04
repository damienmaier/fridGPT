import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { RecipesService } from 'src/app/services/recipes.service';
import { createRecipesServiceSpy, createToastServiceSpy } from 'src/tests/fake-services';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let fakeRecipeService: RecipesService;
  let fakeToastService: ToastService;

  beforeEach(async () => {
    fakeToastService  = createToastServiceSpy();
    fakeRecipeService = createRecipesServiceSpy();
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports:      [FormsModule],
      providers:    [
        {provide: RecipesService, useValue: fakeRecipeService},
        {provide: ToastService, useValue: fakeToastService}
      ]
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
