import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {

  private searchDebounce = 300;
  private searchSubject = new Subject<string>();

  @ViewChild('searchBox') searchBox: ElementRef;
  @Output() onSearch = this.searchSubject.distinctUntilChanged(); // .debounceTime(this.searchDebounce);
  @Output() onFocus = new EventEmitter<string>();

  constructor(private locationService: LocationService) { }

  /**
   * When we first show this search box we trigger a search if there is a search query in the URL
   */
  ngOnInit() {
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
