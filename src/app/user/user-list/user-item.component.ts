import {Component, OnInit, Input} from '@angular/core';
import {User} from "../../shared";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html'
})
export class UserItemComponent implements OnInit {
  @Input() user:User
  @Input() userId:number;
  constructor() { }

  ngOnInit() {
  }

}
