import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { PaginationComponent } from './pagination.component';


@Component({
  selector: 'wrapper-component',
  template: '<app-pagination [totalPages]="2" (pageChange)="pageChange($event)"></app-pagination>',
})
class WrapperComponent {
  @ViewChild(PaginationComponent, {static: true}) paginationComponent!: PaginationComponent;
  pageChange($event: number): void {
  }
}

describe('PaginationComponent', () => {
  let wrapperComponent: WrapperComponent;
  let component: PaginationComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperComponent, PaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.componentInstance;
    component = wrapperComponent.paginationComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get totalPages as input', () => {
    expect(component.totalPages).toBe(2);
  });
  it('should be able to click next button to navigate on next page', () => {
    let selectedPage: number = 1;
    const nextBtn = fixture.debugElement.query(By.css('.next-btn'));
    component.pageChange.pipe(first()).subscribe((hero: number) => selectedPage = hero);
    nextBtn.triggerEventHandler('click', null);
    expect(selectedPage).toBe(2);
  });
  it('should be able to click prev button to navigate on prev page', () => {
    let selectedPage: number = 1;
    component.pageNo = 2;
    const prevBtn = fixture.debugElement.query(By.css('.prev-btn'));
    component.pageChange.pipe(first()).subscribe((hero: number) => selectedPage = hero);
    prevBtn.triggerEventHandler('click', null);    
    expect(selectedPage).toBe(1);
  });
  it('should be disable prev button on first page', () => {
    component.pageNo = 1;
    const prevBtn = fixture.debugElement.query(By.css('.prev-btn'));
    expect(component.isFirst).toBe(true);
    expect(prevBtn.nativeElement.disabled).toBeTruthy();
  });
  it('should be disable next button on last page', () => {
    const nextBtn = fixture.debugElement.query(By.css('.next-btn'));
    nextBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isLast).toBe(true);
    expect(nextBtn.nativeElement.disabled).toBeTruthy();
  });
});
