
import {Role} from "../shared";

export  interface iSecurable {
  //getACL();
  //addACLEntry(ace: ACE);
}

export class User implements iSecurable{
  constructor(public id: number,
              public name: string,
              public email:string,
              public userGroups: Role[]){

  }

  hasGroup(groupId: number){
    for(let group of this.userGroups){
      if((<Role>group).id === groupId) return group;
    }
    return null;
  }
}
