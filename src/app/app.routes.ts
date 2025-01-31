import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent }, // Default homepage
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];
