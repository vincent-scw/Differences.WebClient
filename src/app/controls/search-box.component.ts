import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';

import { CategoryService } from '../services/category.service';
import { Category, CategoryGroup } from '../models/category.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {

  private searchDebounce = 300;
  private searchSubject = new Subject<string>();

  @ViewChild('searchBox') searchBox: ElementRef;
  @Output() onSearch = this.searchSubject.distinctUntilChanged(); // .debounceTime(this.searchDebounce);
  @Output() onFocus = new EventEmitter<string>();

  categoryGroups: CategoryGroup[];

  constructor(private locationService: LocationService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.categoryGroups.subscribe(data => this.categoryGroups = data);

    const query = this.locationService.search()['search'];
    if (query) {
      this.query = query;
      this.doSearch();
    }
  }

  doSearch() {
    this.searchSubject.next(this.query);
  }

  doFocus() {
    this.onFocus.emit(this.query);
  }

  focus() {
    this.searchBox.nativeElement.focus();
  }

  private get query() { return this.searchBox.nativeElement.value; }
  private set query(value: string) { this.searchBox.nativeElement.value = value; }
}
