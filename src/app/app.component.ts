import {Component, OnInit} from '@angular/core';
import {UserService} from "./user/user.service";
import {User} from "./shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  users: User[] ;
  constructor(private userService: UserService){

  }

  ngOnInit(){

  }
}
