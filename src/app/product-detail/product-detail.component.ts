import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', productId); // Debugging

    if (productId) {
      this.fetchProduct(productId);
    }
  }

  fetchProduct(id: string) {
    this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
      .subscribe(data => {
        console.log('Product data:', data); // Debugging
        this.product = data;
      }, error => {
        console.error('Error fetching product:', error);
      });
  }
}
