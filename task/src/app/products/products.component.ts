import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY, fromEvent, iif, Observable, of, Subscription } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, mergeMap } from 'rxjs/operators';
import { Product } from '../models/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private keyUpEvent?: Subscription;
  pageSize: number = 6;
  totalPages: number = 2;
  renderRecommended: boolean = true;
  @ViewChild('searchField') searchField?: ElementRef;
  public productList?: Observable<Product[]>;
  constructor(public readonly productsService: ProductsService) { }

  ngOnInit(): void {
    this.productList = this.productsService.recommendeds()
  }
  ngAfterViewInit() {
    let searchText = '';
    this.keyUpEvent = fromEvent(this.searchField?.nativeElement, 'keyup').pipe(
      map((event: any) => { 
        searchText = event.target.value;
        return event.target.value;
      }),
      distinctUntilChanged(),
      debounceTime(1000),
      mergeMap(
        (searchTerm) => iif(
          () => searchTerm.length > 3,
          this.productsService.searchProduct(searchTerm),
          searchTerm.length === 0 ? this.productsService.recommendeds() : EMPTY
        ),
      ),
    ).subscribe((data) => {
      let limitedProducts = data;
      if (searchText.length > 0) {
        this.totalPages = this.getTotalPages(data.length);
        limitedProducts = data.slice(0, this.pageSize);
        this.renderRecommended = false;
      } else {
        this.renderRecommended = true;
      }
      this.productList = of(limitedProducts);
    })
  }
  private getTotalPages(dataLength: number): number {
    return Math.ceil(dataLength / this.pageSize);
  }
  pageChange($event: number): void {
    this.productList = this.productsService.searchProductsByPage($event, this.pageSize);
  }
  ngOnDestroyed() {
    this.keyUpEvent?.unsubscribe();
  }
}
