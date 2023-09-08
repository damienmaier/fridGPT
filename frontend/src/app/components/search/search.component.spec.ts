import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { RecipesService } from 'src/app/services/recipes.service';
import { createRecipesServiceSpy, createToastServiceSpy } from 'src/tests/fake-services';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from 'src/app/services/toast.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { click, findAllElements, findElement, findNthElement } from 'src/tests/main.test-helper';
import { SuggestedIngredient } from 'src/app/models/suggested-ingredient';
import { DebugElement } from '@angular/core';

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
      imports:      [FormsModule, NgbAccordionModule, BrowserAnimationsModule],
      providers:    [
        {provide: RecipesService, useValue: fakeRecipeService},
        {provide: ToastService, useValue: fakeToastService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not generate recipes with no ingredients selected', () => {
    component.requestedRecipe.ingredients = [];
    click(fixture, 'start-btn');
    expect(fakeRecipeService.startLoadingRecipe).not.toHaveBeenCalled();
    expect(fakeToastService.show).toHaveBeenCalledWith('Veuillez ajouter au moins un ingrédient','bg-danger text-light');
  });

  it('time parameter should not be visible at first but should be visible after clicking on the icon', () => {
    try {
      findElement(fixture, 'time-param');
    } catch(e: any) {
      expect(e.message).toBeTruthy();
    }
    click(fixture, 'time-btn');
    fixture.whenStable().then(() => {
      expect(findElement(fixture, 'time-param')).toBeTruthy();
    })
  });

  it('portion parameter should not be visible at first but should be visible after clicking on the icon', () => {
    try {
      findElement(fixture, 'portion-param');
    } catch(e: any) {
      expect(e.message).toBeTruthy();
    }
    click(fixture, 'portion-btn');
    fixture.whenStable().then(() => {
      expect(findElement(fixture, 'portion-param')).toBeTruthy();
    })
  });

  it('level parameter should not be visible at first but should be visible after clicking on the icon', () => {
    try {
      findElement(fixture, 'level-param');
    } catch(e: any) {
      expect(e.message).toBeTruthy();
    }
    click(fixture, 'level-btn');
    fixture.whenStable().then(() => {
      expect(findElement(fixture, 'level-param')).toBeTruthy();
    })
  });

  it('default ingredients accordion should be open by default and closable', () => {
    expect(findAllElements(fixture, 'default-ingredient').length).toBe(1);
    click(fixture, 'accordion-header');
    fixture.whenStable().then(() => {
      expect(findAllElements(fixture, 'default-ingredient').length).toBe(0);
    });
  });

  it('should display the new requested ingredient', () => {
    component.addIngredientToList(new SuggestedIngredient('bacon', 'kg', false, 1, false));
    fixture.whenStable().then(() => {
      expect(findAllElements(fixture, 'requested-ingredient').length).toBe(1);
    });
  });

  it('should not allow duplicates', () => {
    component.addIngredientToList(new SuggestedIngredient('bacon', 'kg', false, 1, false));
    fixture.whenStable().then(() => {
      component.addIngredientToList(new SuggestedIngredient('bacon', 'kg', false, 1, false));
      fixture.whenStable().then(() => {
        expect(findAllElements(fixture, 'requested-ingredient').length).toBe(1);
      });
    });
  });

  it('should remove item from list', () => {
    component.addIngredientToList(new SuggestedIngredient('bacon', 'kg', false, 1, false));
    fixture.whenStable().then(() => {
      component.removeIngredientFromList('bacon');
      fixture.whenStable().then(() => {
        expect(findAllElements(fixture, 'requested-ingredient').length).toBe(0);
      });
    });
  });

  it('requested ingredients should not contain default ingredients', () => {
    const elements = findAllElements(fixture, 'requested-ingredient');
    elements.forEach((el: DebugElement) => {
      expect(el.nativeElement.textContent).not.toContain('poulet');
    });
  });

  it('clicking on the trash in the default ingredients list removes it from the requested ingredients', () => {
    const container = findNthElement(fixture, 'default-ingredient-bin', 0);
    expect(container).toBeTruthy();
    const firstBiTrashIcon = container;
    firstBiTrashIcon.nativeElement.click();
    fixture.detectChanges();
    expect(component.requestedRecipe.ingredients.every(el => el.name !== 'poulet')).toBeTruthy();
  });

  it('clicking on the trash in the requested ingredients list removes it from the requested ingredients', () => {
    component.addIngredientToList(new SuggestedIngredient('bacon', 'kg', false, 1, false));
    fixture.whenStable().then(() => {
      const container = findNthElement(fixture, 'requested-ingredient-bin', 0);
      expect(container).toBeTruthy();
      const firstBiTrashIcon = container;
      firstBiTrashIcon.nativeElement.click();
      fixture.detectChanges();
      expect(component.requestedRecipe.ingredients.every(el => el.name !== 'bacon')).toBeTruthy();
    });
  });

  it('clicking on the checkbox flip the boolean value in the request', () => {
    click(fixture, 'other-allowed-check');
    fixture.whenStable().then(() => {
      expect(component.requestedRecipe.otherIngredientsAllowed).toBeTruthy();
    });
  });

  it('should call the method to start generating recipes in the service after adding at least one ingredient', () => {
    component.addIngredientToList(new SuggestedIngredient('bacon', 'kg', false, 1, false));
    fixture.whenStable().then(() => {
      click(fixture, 'start-btn');
      expect(fakeRecipeService.startLoadingRecipe).toHaveBeenCalledWith(component.requestedRecipe);
    });
  });
});
