import {Component, Input, OnInit} from '@angular/core';
import {TreeFolder, TreeNode} from './tree-view-nodes';
import {FileIoService} from "../file-io.service";

@Component({
  selector: 'app-tree-view-folder',
  templateUrl: './tree-view-folder.component.html',
  styles: []
})
export class TreeViewFolderComponent {
  @Input() thisNode: TreeFolder;


  constructor(private FIO: FileIoService) { }

  expand() {
    if (!this.thisNode.expanded && this.thisNode.childrens.length === 0) {
      if ( this.thisNode.nodeCach.length === 0 ) {
        this.thisNode.childrens = this.FIO.getChildrens(this.thisNode.id);
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
