import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/loading/loading.component';

const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'loading', component: LoadingComponent },
    { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}