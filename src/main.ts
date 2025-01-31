import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ProductsComponent } from './app/products/products.component';

bootstrapApplication(ProductsComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));
