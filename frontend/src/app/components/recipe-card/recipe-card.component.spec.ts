import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardComponent } from './recipe-card.component';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeCardComponent]
    });
    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    component.recipe = {dishName:'', dishDescription: '', ingredients: '',steps: [], imageUrl: '',
      coach: {name: '', description: '', imageUrl:''}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
