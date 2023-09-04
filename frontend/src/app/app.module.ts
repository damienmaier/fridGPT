import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { RecipesService } from './services/recipes.service';
import { LoadingComponent } from './components/loading/loading.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ResultComponent } from './components/result/result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoachModalComponent } from './components/coach-modal/coach-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoadingComponent,
    RecipeComponent,
    ResultComponent,
    CoachModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
