import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    //component.pageNo = 2;
    const nextBtn = fixture.debugElement.query(By.css('.next-btn'));
    nextBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isLast).toBe(true);
    console.log('::::::::', nextBtn.nativeElement);
    expect(nextBtn.nativeElement.disabled).toBeTruthy();
  });
});
