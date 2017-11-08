import { Injectable } from '@angular/core';
import {TreeFile, TreeFolder, TreeNode, TreeNodeType} from './tree-view/tree-view-lib';
import {isUndefined} from 'util';

@Injectable()
export class FileIoService {

  constructor() { }

  public   nodes() {
    return  new Array<TreeNode>(
      new TreeFolder(1, TreeNodeType.Folder, 'home', '/', 0),
      new TreeFolder(201, TreeNodeType.Folder, 'Lib 01', '/lib_01', 0),
      new TreeFolder(202, TreeNodeType.Folder, 'Lib 02', '/lib_02', 0),
      new TreeFolder(203, TreeNodeType.Folder, 'Lib 03', '/lib_03', 0),
      new TreeFolder(204, TreeNodeType.Folder, 'Sublib 01', '/lib_01/Sublib_01', 201),
      new TreeFolder(205, TreeNodeType.Folder, 'Child 01', '/', 1),
      new TreeFolder(206, TreeNodeType.Folder, 'Child 0101', '/', 205),
      new TreeFolder(207, TreeNodeType.Folder, 'Child 0102', '/', 205),

      new TreeFile(301, TreeNodeType.File, 'File_01', '/', 1),
      new TreeFile(302, TreeNodeType.File, 'root File', '/', 201, 'jpg'),
      new TreeFile(303, TreeNodeType.File, 'File_02', '/', 201, 'png')
    ).sort((A, B) => {
      return A.nodeType - B.nodeType;
    });
  }

  public getNode( Id: Number) {
    return this.nodes().filter((node) => {
      return node.id === Id;
    })[0];
  }

  public getChildrens(parentId: number) {
    return this.nodes().filter((child) => {
      return child.parent === parentId;
    });
  }

  public getParent(treeNode: TreeNode) {
    return this.nodes().filter((node) => {
      return node.id === treeNode.parent;
    })[0];
  }
  public getPath(treeNode: TreeNode) {
    const path = [];
    while ( !isUndefined(treeNode) ) {
      path.push(treeNode.name);
      treeNode = this.getParent(treeNode);
    }

    return path.reverse();
  }
}
