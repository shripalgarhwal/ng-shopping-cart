import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(public readonly cartService: CartService) { }
  ngOnInit(): void {
  }
  priceTotal(cartItems: Product[]): string {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    })
    return '$' + total.toFixed(2);
  }
}
