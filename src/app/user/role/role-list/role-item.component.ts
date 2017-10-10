import {Component, OnInit, Input} from '@angular/core';
import {Role} from "../../../shared/user-group";

@Component({
  selector: 'app-role-item',
  templateUrl: './role-item.component.html',
  styles: []
})
export class RoleItemComponent implements OnInit {
  @Input() role: Role;
  constructor() { }

  ngOnInit() {
  }

}
