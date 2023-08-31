import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { LoadingComponent } from './components/loading/loading.component';

const routes: Routes = [
    { path: 'app', component: LoadingComponent },
    { path: 'app/recipe', component: RecipeComponent },
    { path: '**', redirectTo: 'app' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}