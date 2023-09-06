import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { RecipesService } from './services/recipes.service';
import { LoadingComponent } from './components/utilities/loading/loading.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ResultComponent } from './components/result/result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoachModalComponent } from './components/utilities/modals/coach-modal/coach-modal.component';
import { HelpModalComponent } from './components/utilities/modals/help-modal/help-modal.component';
import { ModalService } from './services/modal.service';
import { ToastService } from './services/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/utilities/toast/toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeCardComponent } from './components/utilities/recipe-card/recipe-card.component';
import { GearComponent } from './components/utilities/rotating-image/rotating-image.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoadingComponent,
    RecipeComponent,
    ResultComponent,
    CoachModalComponent,
    HelpModalComponent,
    ToastComponent,
    RecipeCardComponent,
    GearComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbToastModule,
    BrowserAnimationsModule
  ],
  providers: [RecipesService, ModalService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
