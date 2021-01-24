import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaragePage } from './pages/garage/garage.page';

const routes: Routes = [
  {
    path: 'garage',
    component: GaragePage,
  },
  {
    path: '',
    redirectTo: 'garage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
