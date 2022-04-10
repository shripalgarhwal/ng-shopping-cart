import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  recommendeds(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/recommendeds');
  }
  searchProduct(searchText: string) {
    return this.http.get<Product[]>(`http://localhost:8080/products/?q=${searchText}`)
  }
}
