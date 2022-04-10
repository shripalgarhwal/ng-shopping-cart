import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input('product') product?: Product;
  public addedToCart: boolean = false;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  buyProduct(item: Product | undefined): void {
    if(item) {
      this.addedToCart = !this.addedToCart;
      this.cartService.addToCard(item);
    }
  }
}
