import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from './result.component';
import { createModalServiceSpy, createRecipesServiceSpy } from 'src/tests/fake-services';
import { RecipesService } from 'src/app/services/recipes.service';
import { ModalService } from 'src/app/services/modal.service';
import { LoadingComponent } from '../loading/loading.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let fakeRecipeService: RecipesService;
  let fakeModalService: ModalService;

  beforeEach(async () => {
    fakeRecipeService = createRecipesServiceSpy();
    fakeModalService = createModalServiceSpy();
    TestBed.configureTestingModule({
      declarations: [ResultComponent, LoadingComponent],
      providers: [
        {provide: RecipesService, useValue: fakeRecipeService},
        {provide: ModalService, useValue: fakeModalService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(ResultComponent);
    component  = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
