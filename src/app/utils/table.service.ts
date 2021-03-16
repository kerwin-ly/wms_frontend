import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TableUtils {
  constructor() {}

  fixPageIndex(list = [], pageIndex: number): number {
    if (list.length === 1 && pageIndex > 1) {
      pageIndex--;
    }
    return pageIndex;
  }
}
