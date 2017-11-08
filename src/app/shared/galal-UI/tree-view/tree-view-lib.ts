export class TreeNode {
  status = false;

  constructor(public id: number, public nodeType: TreeNodeType,
              public name: string, public Path: string, public parent: number = 0) {}

}

export class TreeFolder extends  TreeNode {
  constructor( id: number, nodeType: TreeNodeType,
               name: string, Path: string, parent: number = 0) {
    super(id, nodeType, name, Path, parent);
  }
  childrens = [];
  nodeCach = [];
  expanded = false;
}

export class TreeFile extends  TreeNode {

  constructor( id: number, nodeType: TreeNodeType,
               name: string, Path: string, parent: number = 0, public ext?) {
    super(id, nodeType, name, Path, parent);
  }
}

export enum TreeNodeType {
  Folder = 0,
  File = 1
}
