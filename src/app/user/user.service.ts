import {Injectable, OnInit} from '@angular/core';
import {User, Role} from "../shared";
import {RoleService} from "./role/role.service";
import {isUndefined} from "util";

@Injectable()
export class UserService implements OnInit{
  //eventEmitter:EventEmitter = new EventEmitter<User>();
  private userCount: number = 0;
  private users: User[] = [
    new User(1,"Ahmed","ahmedgalal007@test.com", []),
    new User(2,"Mohamed","mohamed@test.com", []),
    new User(3,"Ali","ali@test.com", [])
  ];

  constructor(private groupService: RoleService) {
    this.userCount = this.users.length;
    for(let user of this.users){
      user.userGroups = this.getUserGroups(user);
    }
  }

  ngOnInit(){

  }

  getUsers(){
    return this.users;
    //TODO-CRUD get users from database order by _id
  }

  getUser(id: number){
    for (let usr of this.users){
      //TODO-CRUD get user from database by _id
      if(usr.id == id)  return usr;
    }
    return null;
  }

  getUserGroups(user: User){
    let groups: Role[] = [];
    //TODO-CRUD get user Groups from database by user _id
    for(let role of this.groupService.getRoles()){
      for (let grpUsr of role.getUsers()){
        if(grpUsr.id === user.id) groups.push(role);
      }
    }
    return groups;
  }

  addUser(name: string, email: string, userGroups: Role[]){
    console.log('user count before insert:' + this.userCount);
    this.users.push(
      new User(this.userCount += 1, name, email, userGroups)
    );
    console.log('user count After insert:' + this.userCount);
  }
  putUser(user: User){
    this.users[this.users.indexOf(this.getUser(user.id))] = user;
  }
  deleteUser(user: User){
    for(let usr of this.users){
      if(usr.id == user.id){
        this.users.splice(this.users.indexOf(user),1);
      }
    }
  }
  static hasGroup(user: User, groupName: string){
    for(let group of user.userGroups){
      if(group.name == groupName) return true;
    }
    return false;
  }

  filterByNameOrEmail(search: string){
    if(isUndefined(search)) return this.users;

    return this.users.filter((user: User)=>{
      if(search.toLowerCase().match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")){
        //noinspection TypeScriptUnresolvedFunction
        return user.email.toLowerCase().includes(search.toLowerCase());
        //TODO-CRUD search database for users and filter users by E-Mail
      }
      //noinspection TypeScriptUnresolvedFunction
      return user.name.toLowerCase().includes(search.toLowerCase());
      //TODO search database for users and filter users by Name
    })
  }

  getRoleByName(roleName: string): Role{
    return this.groupService.getRoleByName(roleName);
  }


}
