import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html'
})
export class TocComponent {
  constructor(private router: Router) {

  }

  askQuestion() {
    this.router.navigateByUrl('/ask-question');
  }
}
