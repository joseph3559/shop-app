import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  searchTitle: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('https://api.escuelajs.co/api/v1/products').subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data; // ✅ Initially, show all products
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  filterByTitle() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }

  getShortDescription(description: string) {
    return description.length > 50 ? description.substring(0, 50) + '...' : description;
  }

  goToProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
