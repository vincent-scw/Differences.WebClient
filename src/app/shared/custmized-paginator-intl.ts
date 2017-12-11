import { MatPaginatorIntl } from '@angular/material';

export class CustmizedPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = '每页显示数';
  nextPageLabel = '下一页';
  previousPageLabel = '上一页';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 / ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }
}
