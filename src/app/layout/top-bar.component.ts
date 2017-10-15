import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationNode } from '../models/navigation.model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})

export class TopBarComponent {
  @Output() onSideNavToggled = new EventEmitter();

  isSideBySide = true;
  topMenuNodes: NavigationNode[] = [
    {
      title: '问题',
      tooltip: '提出与回答问题',
      url: 'questions'
    },
    {
      title: '文章',
      tooltip: '文章',
      url: 'articles'
    },
    {
      title: '大神',
      tooltip: '大神们',
      url: 'users'
    }
  ];

  sideNavToggle() {
    this.onSideNavToggled.emit();
  }

  doSearch(data: any) {

  }
}
