import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  pageNo: number = 1;
  @Input() totalPages: number = 2;
  @Output() pageChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.pageNo = 1;
  }
  get isFirst(): boolean {
    return this.pageNo === 1;
  }

  get isLast(): boolean {
    return this.pageNo === this.totalPages;
  }
  prev(): void {
    this.setPage(Math.max(1, this.pageNo - 1));

  }
  next(): void {
    this.setPage(Math.min(this.totalPages, this.pageNo + 1));
  }
  private setPage(val: number) {
    this.pageNo = val;
    this.pageChange.emit(this.pageNo);
  }

}
