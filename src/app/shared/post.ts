import {User} from "./user";
import {ACE} from "./ace";
import {ResponsibilityTypes} from "./resposibility";
import {ACETypes} from "./ace";

export class Post {
  private created: number;
  private updated: number;
  private updatedBy: User;
  private ACL: ACE[] = [];

  constructor(public id:number, public title: string, private createdBy: User){
    this.created = Date.now();
    this.updated = Date.now();
  }

  update(title: string,  updatedBy: User){
    if(this.checkUserAccess(updatedBy, ResponsibilityTypes.ReadWrite)){
      this.title = title;
      this.updated = Date.now();
      this.updatedBy = updatedBy;
    }
  }

  getACLList():ACE[]{
    return this.ACL;
  }

  addACE(ace:ACE){
    this.ACL.push(ace);
  }

  removeACE(ace:ACE){
    this.ACL.slice(this.ACL.indexOf(ace),1);
  }

  checkUserAccess(user: User, accessTypeId:number){

    //check if User is the Post owner
    if (user == this.createdBy) return true;
    // Grant if Admin
    if (user.hasGroup(1)) return true;
    // Find Group ACE and check if it in the user.groups
    for (let ace of this.ACL){
      if((<ACE>ace).responsibility == accessTypeId ||
        (<ACE>ace).responsibility == ResponsibilityTypes.ReadWrite){
        //Check if this ACE.group in the users groups
        if ((<ACE>ace).aceType == ACETypes.UserGroup){
          if (user.hasGroup((<ACE>ace).typeId)) return true;
          //Check if this ACE.User is the User
        } else if ((<ACE>ace).aceType == ACETypes.User){
          if (user.id == (<ACE>ace).typeId) return true;
        }

      }
    }
    return false;
  }

}
