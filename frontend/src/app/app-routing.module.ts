import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './userManage/login/login.component';
import { RegisterComponent } from './userManage/register/register.component';
import { NotFoundComponent } from './not-found.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { AddCocktailComponent } from './add-cocktail/add-cocktail.component';
import { UserCocktailsComponent } from './cocktails/user-cocktails/user-cocktails.component';

const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addCocktail', component: AddCocktailComponent},
  {path: 'cocktails/:id', component: UserCocktailsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
