import {Component, OnInit} from '@angular/core';
import {Role} from "../../../shared/user-group";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styles: []
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.roles = this.roleService.getRoles();
  }

  onSelect(){

  }

  onSearch(search: string){
    this.roles = this.roleService.filterByName(search);
  }

}
