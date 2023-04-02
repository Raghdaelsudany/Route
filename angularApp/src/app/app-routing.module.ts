import { AuthGuard } from './auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:"full"},

  {path:'home', canActivate:[AuthGuard], component:HomeComponent},
  {path:'brands',canActivate:[AuthGuard], component:BrandsComponent},
  {path:'cart',canActivate:[AuthGuard], component:CartComponent},
  {path:'categories',canActivate:[AuthGuard], component:CategoriesComponent},
  {path:'productDetails/:id',canActivate:[AuthGuard], component:ProductdetailsComponent},

  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'footer', component:FooterComponent},
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
