import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from '../cart/cart.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    CartComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
