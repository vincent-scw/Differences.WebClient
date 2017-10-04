import { Component, OnInit } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
  data: ApolloQueryObservable<any>;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.data = this.userService.getUsers(1, 20);
  }
}
