import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoPageComponent } from './demo-page/demo-page.component';

const routes: Routes = [
    { path: '', component: DemoPageComponent },
    { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}