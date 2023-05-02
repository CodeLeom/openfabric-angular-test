import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserLoginComponent } from './pages/auth/user-login/user-login.component';
import { UserRegistrationComponent } from './pages/auth/user-registration/user-registration.component';

const routes: Routes = [
  { path: '',   redirectTo: '/all-products', pathMatch: 'full' },
  { path: "login", component: UserLoginComponent },
  { path: "signup", component: UserRegistrationComponent },
  { path: 'all-products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
