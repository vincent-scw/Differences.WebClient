import {
  Component, EventEmitter, Output,
  AfterViewInit, Renderer, HostListener,
  ViewChild, ElementRef
} from '@angular/core';
import { Location } from '@angular/common';
import { NavigationNode } from '../models/navigation.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})

export class TopBarComponent implements AfterViewInit {
  shown = false;

  public height: number;
  public duration = 350;

  public collapse = false;
  public showClass = false;
  public collapsing = false;

  @ViewChild('collapseNav') el: ElementRef;
  @ViewChild('nav') navbar: ElementRef;

  topMenuNodes: NavigationNode[] = [
    {
      title: '问题',
      tooltip: '提出与回答问题',
      url: 'questions'
    },
    // {
    //   title: '大神',
    //   tooltip: '大神们',
    //   url: 'users'
    // }
  ];

  constructor(private dialog: MatDialog,
    private location: Location,
    private renderer: Renderer) {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.height = this.el.nativeElement.scrollHeight;
      this.collapse = true;
    });
  }

  doSearch(data: any) {

  }

  toggle(event: any) {
    event.preventDefault();
    if (!this.collapsing) {
      if (this.shown) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  show() {
    this.shown = true;
    this.collapse = false;
    this.collapsing = true;
    setTimeout(() => {
      this.renderer.setElementStyle(this.el.nativeElement, 'height', this.height + 'px');
    }, 10);

    setTimeout(() => {
      this.collapse = true;
      this.collapsing = false;
      this.showClass = true;
    }, this.duration);
  }

  hide() {
    this.shown = false;
    this.collapse = false;
    this.showClass = false;
    this.collapsing = true;
    setTimeout(() => {
      this.renderer.setElementStyle(this.el.nativeElement, 'height', '0px');
    }, 10);

    setTimeout(() => {
      this.collapsing = false;
      this.collapse = true;
    }, this.duration);
  }

  get displayStyle() {
    return '';
  }

  @HostListener('window:resize', ['$event']) onresize(event: any) {
    const breakpoit = 992;

    if (event.target.innerWidth < breakpoit) {
      if (!this.shown) {
        this.collapse = false;
        this.renderer.setElementStyle(this.el.nativeElement, 'height', '0px');
        this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '0');
        setTimeout(() => {
          this.height = this.el.nativeElement.scrollHeight;
          this.collapse = true;
          this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '');
        }, 4);
      }
    } else {
      this.collapsing = false;
      this.shown = false;
      this.showClass = false;
      this.collapse = true;
      this.renderer.setElementStyle(this.el.nativeElement, 'height', '');
    }
  }

  @HostListener('document:scroll', ['$event']) onScroll() {
    if (this.navbar.nativeElement.classList.contains('scrolling-navbar')) {
      if (window.pageYOffset > 120) {
        this.renderer.setElementClass(this.navbar.nativeElement, 'top-nav-collapse', true);
      } else {
        this.renderer.setElementClass(this.navbar.nativeElement, 'top-nav-collapse', false);
      }
    }
  }
}
