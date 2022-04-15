import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product[] = [];
  private cartItems$: BehaviorSubject<Product[]> = new BehaviorSubject([] as Product[]);
  constructor() { }
  addToCard(product: Product): void {
    this.products.push(product);
    this.cartItems$.next(this.products);
  }
  public get cartItems(): Observable<Product[]> {
    return this.cartItems$ as Observable<Product[]>;
  }
  removeCard(product: Product): void {
    this.products = this.products.filter((item: Product) => item.id !== product.id);
    this.cartItems$.next(this.products);
  }
}
