
import {iSecurable, User} from "../shared";

export class Role implements iSecurable{
  private users:User[] = [];
  constructor(public id: number,public name: string){}

  getUsers():User[]{
    return this.users;
  }

  addUser(user:User){
    this.users.push(user);
  }

  hasUser(user: User): boolean{
    for(let usr of this.users){
      if(usr.id === user.id) return true;
    }
    return false;
  }

  getUser(id:number): User{
    for(let usr of this.users){
      if(usr.id === id) return usr;
    }
  }
}
