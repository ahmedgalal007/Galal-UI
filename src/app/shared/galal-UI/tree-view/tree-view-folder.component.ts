import {Component, Input, OnInit} from '@angular/core';
import {TreeFolder, TreeNode} from './tree-view-nodes';

@Component({
  selector: 'app-tree-view-folder',
  templateUrl: './tree-view-folder.component.html',
  styles: []
})
export class TreeViewFolderComponent implements OnInit {
  @Input() thisNode: TreeFolder;


  constructor() { }

  ngOnInit() {
  }

  nodes() {
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

  getChildrens(parentId: number) {
    return this.nodes().filter((child) => {
      return child.parent === parentId;
    });
  }

  expand() {
    if (!this.thisNode.expanded && this.thisNode.childrens.length === 0) {
      if ( this.thisNode.nodeCach.length === 0 ) {
        this.thisNode.childrens = this.getChildrens(this.thisNode.id);
      }else {
        this.thisNode.childrens = this.thisNode.nodeCach;
      }
      this.thisNode.expanded = true;
    }else if ( this.thisNode.childrens.length > 0 ) {
      this.thisNode.nodeCach = this.thisNode.childrens;
      this.thisNode.childrens = [];
      this.thisNode.expanded = false;
    }
  }

  open() {
    // emit the brower-view.component updateBrowser event
    // with thisNode after propagate it's children
  }
}
