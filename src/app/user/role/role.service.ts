import {Injectable, OnInit} from '@angular/core';
import {User, Role} from "../../shared";
import {UserService} from "../user.service";
import {isUndefined} from "util";


@Injectable()
export class RoleService implements OnInit{

  private users: User[] = [
    new User(1,"Ahmed","ahmedgalal007@test.com", []),
    new User(2,"Mohamed","mohamed@test.com", []),
    new User(3,"Ali","ali@test.com", [])
  ];

  roles:Role[] = [
    new Role(1, "admin"),
    new Role(2, "moderator"),
    new Role(3, "writer"),
    new Role(4, "GroupManager")
  ]

  constructor() {
    this.addUsersRoles();
  }

  ngOnInit(){

  }

  addUserToRole(user:User, roleName: string){
    let role = this.getRoleByName(roleName);
    if( role ){
      //check if user not exists then add the users.
      if (!role.getUser(user.id)) {
        role.addUser(user);
        user.userGroups.push(role);
      }
    }
  }
  getRoles(){
    return this.roles;
  }
  getRoleByName(roleName:string){
    for(let role of this.roles){
      if (role.name === roleName ) return role;
    }
    return null;
  }

  getRoleById(roleId: number){
    for(let role of this.roles){
      if (role.id == roleId ) return role;
    }
    return null;
  }

  addRole(roleName: string){
    let nextId: number = this.roles[ this.roles.length - 1 ].id + 1;
    this.roles.push(new Role(nextId, roleName));
  }

  putRole(role:Role){
    this.roles[this.roles.indexOf( this.getRoleById(role.id) )]= role;
  }

  deleteRole(role: Role){
    this.roles.splice(this.roles.indexOf(role), 1);
  }

  filterByName(search: string){
    if(isUndefined(search)) return this.roles;

    return this.roles.filter((role: Role)=>{
      //noinspection TypeScriptUnresolvedFunction
      return role.name.toLowerCase().includes(search.toLowerCase());
      //TODO search database for roles and filter users by Name
    })
  }


  // HELPERS
  addUsersRoles(){
    //this.users = this.userService.getUsers();
    this.addUserToRole(this.users[0], "admin");
    this.addUserToRole(this.users[0], "moderator");
    this.addUserToRole(this.users[1], "moderator");
    this.addUserToRole(this.users[1], "writer");
    this.addUserToRole(this.users[2], "writer");
    this.addUserToRole(this.users[2], "GroupManager");
  }
}
