export class TreeNode {

  constructor(public id: number, public nodeType: string,
              public name: string, public Path: string, public parent: number = 0) {}

}

export class TreeFolder extends  TreeNode {
  constructor( id: number, nodeType: string,
               name: string, Path: string, parent: number = 0){
    super(id, nodeType, name, Path, parent);
  }
  childrens = [];
  nodeCach = [];
  expanded = false;
}

export class TreeFile extends  TreeNode {

}
