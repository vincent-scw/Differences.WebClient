import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html'
})

export class ArticleItemComponent {
  @Input() item: any;
}
