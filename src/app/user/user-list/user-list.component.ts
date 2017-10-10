import {Component, OnInit} from '@angular/core';
import {User} from "../../shared";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users:User[] = [];
  currentUser:User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }


  onSelect(user:User){
    this.currentUser = user;
    //this.userService.eventEmitter.emit(user);
  }

  onSearch(search: string){
    this.users = this.userService.filterByNameOrEmail(search);
  }

}
