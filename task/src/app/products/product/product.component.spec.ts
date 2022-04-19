import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';

import { ProductComponent } from './product.component';

@Component({
  selector: 'wrapper-component',
  template: '<app-product [product]="product"></app-product>',
})
class WrapperComponent {
  @ViewChild(ProductComponent, {static: true}) productComponent!: ProductComponent;
  product = {
    "name": "Incredible Metal Sausages",
    "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    "defaultImage": "http://placeimg.com/640/480/cats",
    "images": [
        "http://placeimg.com/640/480/cats",
        "http://placeimg.com/640/480/cats",
        "http://placeimg.com/640/480/cats",
        "http://placeimg.com/640/480/cats"
    ],
    "price": 64946.54,
    "discount": 8
  }
}

describe('ProductComponent', () => {
  let wrapperComponent: WrapperComponent;
  let component: ProductComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperComponent, ProductComponent ],
      providers: [CartService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.componentInstance;
    component = wrapperComponent.productComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render product details', () => {
    const titleEl = fixture.debugElement.query(By.css('.card-title'));
    const descriptionEl = fixture.debugElement.query(By.css('.text-muted'));
    expect(titleEl.nativeElement.textContent).toBe('Incredible Metal Sausages');
    expect(descriptionEl.nativeElement.textContent).toBe('The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality');
  });
  it('should product add to cart on click Add to Cart button', () => {
    const addToCartBtn = fixture.debugElement.query(By.css('.btn'));
    const service = fixture.debugElement.injector.get(CartService);
    let spyAddtoCart = spyOn(service,"addToCard").and.callFake((product) => {
      expect(product.name).toBe('Incredible Metal Sausages');
    });
    addToCartBtn.triggerEventHandler('click', null);
    expect(spyAddtoCart).toHaveBeenCalled();
  });
});
