import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  UserService,
  AtApiService,
  ITopicNormalAPI,
  AtError,
  IAtError
} from '../../services';

import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-topic-edit',
  templateUrl: './topic-edit.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class TopicEditDialogComponent implements OnInit, OnDestroy {
  topic: ITopicNormalAPI;
  title = '';
  tags = '';
  text = '';
  errors: IAtError[] = [];

  constructor(public user: UserService,
    private api: AtApiService,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TopicEditDialogComponent>) {
  }

  ngOnInit() {
    this.title = this.topic.title;
    this.tags = this.topic.tags.join(' ');
    this.text = this.topic.text;
  }

  ngOnDestroy() {
  }

  async ok() {
    let ud = this.user.ud.getValue()!;
    try {
      let topic = await this.api.updateTopic(ud.auth, {
        id: this.topic.id,
        title: this.title,
        tags: this.tags.length === 0 ? [] : this.tags.split(/[\s　\,]+/),
        text: this.text
      });
      this.errors = [];
      this.dialogRef.close(topic);
    } catch (e) {
      if (e instanceof AtError) {
        this.errors = e.errors;
      } else {
        throw e;
      }
    }
  }
}