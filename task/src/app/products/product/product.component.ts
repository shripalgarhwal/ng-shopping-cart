import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private cartServiceSubscription?: Subscription
  @Input('product') product?: Product;
  public addedToCart: boolean = false;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartServiceSubscription = this.cartService.cartItems.subscribe((cartItems: Product[]) => {
      if (this.product && cartItems.indexOf(this.product) !== -1) {
        this.addedToCart = true;
      } else {
        this.addedToCart = false;
      }
    })
  }
  buyProduct(item: Product | undefined): void {
    if(item) {
      this.addedToCart = !this.addedToCart;
      this.cartService.addToCard(item);
    }
  }
  ngOnDestroyed() {
    this.cartServiceSubscription?.unsubscribe();
  }
}
