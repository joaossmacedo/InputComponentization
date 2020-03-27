import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: '', pathMatch: 'full', redirectTo: 'register' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
