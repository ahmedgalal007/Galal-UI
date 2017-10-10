/**
 * Created by ahmedgalal on 2/22/17.
 */
import { TestBed, async } from '@angular/core/testing';
import {UserService,RoleService} from "../user/";
import {ACLService} from "./acl.service";
import {Post} from "./post";
import {User} from "./user";
import {ResponsibilityTypes} from "./resposibility";
import {ACE, ACETypes} from "./ace";
import {Role} from "./user-group";

var adminGroup:Role = new Role(1, 'admin')

var admin:User = new User(1,"adminUser","admin@test.com",[adminGroup]);
var owner:User = new User(5,"OwnerUser","Owner@test.com",[]);
var dummy:User = new User(6,"DummyUser","dummy@test.com",[]);

var post = new Post(1, "New Post", owner);

post.addACE(new ACE(ACETypes.User,dummy.id,ResponsibilityTypes.Read));

describe('PostClass', () => {

  it('should Allow Owner to Access', async(() => {
    expect(post.checkUserAccess(owner, ResponsibilityTypes.Read)).toBeTruthy("the Owner Can't Read to Post");
    expect(post.checkUserAccess(owner, ResponsibilityTypes.Write)).toBeTruthy("the Owner Can't Write to Post");
    expect(post.checkUserAccess(owner, ResponsibilityTypes.ReadWrite)).toBeTruthy("the Owner Can't ReadWrite to Post");
    expect(post.checkUserAccess(owner, ResponsibilityTypes.G)).toBeTruthy("the Owner Can't G to Post");
  }));

  it('should Fail Dummy user Access ', async(() => {
    expect(post.checkUserAccess(dummy , ResponsibilityTypes.Read)).toBeTruthy("the Dummy Can't Read the Post");
    expect(post.checkUserAccess(dummy , ResponsibilityTypes.ReadWrite)).toBeFalsy("the Dummy Can Edit the Post");
  }));

  it('should Check if User has a Group [hasGroup()]', async(() => {
    expect(admin.hasGroup(adminGroup.id)).toBeTruthy('user admin must have admin group');
  }));

});
