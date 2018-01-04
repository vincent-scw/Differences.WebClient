import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/account/auth.service';
import { User } from '../../models/user.model';
import { Mode, ModeToggleableBase } from '../../componentbase/mode-toggleable-base';
import { Answer, AnswerLiked } from '../../models/answer.model';
import { QuestionAnswerService } from '../../services/question-answer.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-panel',
  templateUrl: './content-panel.component.html'
})

export class ContentPanelComponent extends ModeToggleableBase
  implements OnInit, OnChanges, OnDestroy {
  @Input() data: Answer;
  @Input() replyEnabled = true;
  @Input() alwaysShowActionbar = true;
  @Output() update = new EventEmitter<any>();
  @Output() reply = new EventEmitter<any>();
  @Output() like = new EventEmitter<number>();

  showStatusBar: boolean;
  showEditPanel: boolean;

  currentUser: User;

  newContent: string;
  myReplyContent: string;

  isLiked: boolean;
  answerLiked: AnswerLiked;

  private valueChangeSubcription: Subscription;

  constructor(private authService: AuthService,
    private questionAnswerService: QuestionAnswerService) {
    super();
    this.currentUser = authService.getUser();
  }

  ngOnInit() {
    this.newContent = this.data.content;
    this.valueChangeSubcription = this.questionAnswerService.getAnswerLike(this.data.id)
      .valueChanges.subscribe(({ data }) => {
        this.answerLiked = data.answerLikedByAnswer;
        if (this.currentUser != null && this.currentUser.id === this.data.user.id) {
          this.isLiked = true;
        } else {
          this.isLiked = this.answerLiked.liked == null ? false : this.answerLiked.liked;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnDestroy() {
    if (!!this.valueChangeSubcription) { this.valueChangeSubcription.unsubscribe(); }
  }

  onEdit() {
    this.toggleMode(Mode.edit);
  }

  onSubmit() {
    this.update.emit({
      id: this.data.id,
      content: this.newContent
    });
    this.toggleMode(Mode.view);
  }

  onCancel() {
    this.toggleMode(Mode.view);
    this.newContent = this.data.content;
  }

  onReplySubmit() {
    this.reply.emit({
      parentId: this.data.id,
      content: this.myReplyContent
    });
    this.toggleEditPanel();
  }

  onLike() {
    if (this.isLiked) { return; }
    this.like.emit(this.data.id);
  }

  toggleEditPanel() {
    this.showEditPanel = !this.showEditPanel;
  }
}
