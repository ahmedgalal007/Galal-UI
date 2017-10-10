
/*export class Responsibility {

  constructor(public responsibilityType: string){

  }
}*/

export class ResponsibilityType{
  constructor(private name: string, private value: number){}

  getName(){return this.name}

  getId(){return this.value;}
}


export enum ResponsibilityTypes {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
    // computed member
  G = "123".length
}
