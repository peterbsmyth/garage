import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaragePage } from './pages/garage/garage.page';

const routes: Routes = [
  {
    path: '',
    component: GaragePage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
