import { Injectable } from '@angular/core';
import {TreeFolder, TreeNode} from './tree-view/tree-view-nodes';

@Injectable()
export class FileIoService {

  constructor() { }

  public   nodes() {
    return  new Array<TreeNode>(
      new TreeFolder(1, 'Folder', 'root', '/'),
      new TreeNode(2, 'File', 'root File', '/'),
      new TreeFolder(3, 'Folder', 'Child 01', '/', 1),
      new TreeNode(4, 'File', 'File1', '/', 1),
      new TreeFolder(5, 'Folder', 'Child 0101', '/', 3),
      new TreeFolder(6, 'Folder', 'Child 0102', '/', 3),
      new TreeNode(7, 'File', 'File 2', '/', 6)
    );
  }

  public getChildrens(parentId: number) {
    return this.nodes().filter((child) => {
      return child.parent === parentId;
    });
  }
}
