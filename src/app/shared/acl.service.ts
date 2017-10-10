import { Injectable } from '@angular/core';

import {Post} from "./post";
import {ACE} from "./ace";

@Injectable()
export class ACLService {

  constructor() { }

  addACEToPost(post:Post, ace:ACE){
    post.addACE(ace);
  }

  getPostACL(post:Post){
    return post.getACLList();
  }

}
