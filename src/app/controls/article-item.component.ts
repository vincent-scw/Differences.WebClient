import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-item',
  template: `
    <a mdLine [routerLink]="['/articles', item.id]"
      [innerHTML]="item.title | title"></a>
    `
})

export class ArticleItemComponent {
  @Input() item: any;
}
