import { Component, OnInit } from '@angular/core';
import {User} from "../shared";
import {UserService} from "./user.service";

@Component({
  selector: 'app-acl-user',
  templateUrl: './user.component.html',
  providers:[UserService]
})
export class UserComponent implements OnInit {
  users: User[] ;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    //console.log(this.users);
  }

}
