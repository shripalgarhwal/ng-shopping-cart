import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY, fromEvent, iif, Observable, of, Subscription } from 'rxjs';
import { mapTo, map, distinctUntilChanged, filter, debounceTime, switchMap, tap, mergeMap } from 'rxjs/operators';
import { Product } from '../models/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private keyUpEvent?: Subscription;
  @ViewChild('searchField') searchField?: ElementRef;
  public productList?: Observable<Product[]>;
  constructor(public readonly productsService: ProductsService) { }

  ngOnInit(): void {
    this.productList = this.productsService.recommendeds()
  }
  ngAfterViewInit() {
    this.keyUpEvent = fromEvent(this.searchField?.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000),
      mergeMap(
        (searchTerm) => iif(
          () => searchTerm.length > 3,
          this.productsService.searchProduct(searchTerm),
          searchTerm.length === 0 ? this.productsService.recommendeds() : EMPTY
        )
      ),
    ).subscribe((data) => {
      this.productList = of(data)
    })
  }
  ngOnDestroyed() {
    this.keyUpEvent?.unsubscribe();
  }
}
