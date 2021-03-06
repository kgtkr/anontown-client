import { Component, OnInit } from '@angular/core';
import {
  UserService,
  ITopicNormalAPI,
  ITopicForkAPI,
  AtApiService,
  AtError,
  IAtError
} from '../../services';

import { MatDialogRef, MatSnackBar } from '@angular/material';
import * as Immutable from 'immutable';

@Component({
  selector: 'app-dialog-topic-fork',
  templateUrl: './topic-fork.component.html',
  styleUrls: ['./topic-fork.component.scss']
})
export class TopicForkDialogComponent implements OnInit {
  topic: ITopicNormalAPI;
  children: Immutable.List<ITopicForkAPI>;
  title = '';
  errors: IAtError[] = [];
  constructor(public user: UserService,
    private api: AtApiService,
    private dialogRef: MatDialogRef<TopicForkDialogComponent>,
    private snackBar: MatSnackBar) { }

  async ngOnInit() {
    try {
      this.children = Immutable.List(await this.api.findTopicFork({
        parent: this.topic.id,
        skip: 0,
        limit: 100,
        activeOnly: false
      }));
    } catch (_e) {
      this.snackBar.open('トピック取得に失敗', "OK", { duration: 5000 });
    }
  }

  async write() {
    try {
      let topic = await this.api.createTopicFork(this.user.ud.getValue()!.auth, {
        title: this.title,
        parent: this.topic.id
      });

      this.errors = [];
      this.dialogRef.close(topic.id);
    } catch (e) {
      if (e instanceof AtError) {
        this.errors = e.errors;
      } else {
        throw e;
      }
    }
  }
}