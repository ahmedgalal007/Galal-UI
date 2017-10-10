/*  ACE Access Control Entry Class to record roles , users privileges that creates an ACL  on each post for  */


export enum ACETypes{
  User = 1,
  UserGroup = 2
}
export class ACE {
  constructor(public aceType: number, public typeId: number, public responsibility:number){}
}
