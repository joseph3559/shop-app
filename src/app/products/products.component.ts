import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string; image: string };
  images: string[];
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTitle: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = data;
      });
  }

  filterByTitle() {
    if (this.searchTitle.trim()) {
      this.http.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?title=${this.searchTitle}`)
        .subscribe(data => {
          this.filteredProducts = data;
        });
    } else {
      this.filteredProducts = this.products;
    }
  }
}
