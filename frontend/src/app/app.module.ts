import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalService } from './services/modal.service';
import { ToastService } from './services/toast.service';
import { RecipesService } from './services/recipes.service';

import { AppComponent } from './app.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/search/search.component';
import { ToastComponent } from './components/utilities/toast/toast.component';
import { LoadingComponent } from './components/utilities/loading/loading.component';
import { RecipeCardComponent } from './components/utilities/recipe-card/recipe-card.component';
import { HelpModalComponent } from './components/utilities/modals/help-modal/help-modal.component';
import { CoachModalComponent } from './components/utilities/modals/coach-modal/coach-modal.component';
import { RotatingImageComponent } from './components/utilities/rotating-image/rotating-image.component';

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
    RotatingImageComponent
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
