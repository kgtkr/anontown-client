import { Component, EventEmitter, Output } from '@angular/core';
import {
  AtApiService,
  AtError,
  IClientAPI,
  IAtError,
  UserService
} from '../../services';


@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['client-add.component.scss']
})
export class ClientAddComponent {
  url = '';
  name = '';
  errors: IAtError[] = [];

  @Output()
  add = new EventEmitter<IClientAPI>();

  constructor(public user: UserService,
    private api: AtApiService) {

  }

  async ok() {
    let ud = this.user.ud.getValue() !;
    try {
      let client = await this.api.createClient(ud.auth, {
        name: this.name,
        url: this.url
      });
      this.add.emit(client);
      this.errors = [];
    } catch (e) {
      if (e instanceof AtError) {
        this.errors = e.errors;
      } else {
        throw e;
      }
    }
  }
}
