import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
    { path: 'app', component: SearchComponent },
    { path: 'app/result', component: ResultComponent },
    { path: 'app/recipe/:recipeId', component: RecipeComponent },
    { path: '**', redirectTo: 'app' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}