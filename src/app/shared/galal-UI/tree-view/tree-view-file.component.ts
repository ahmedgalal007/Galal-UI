import {Component, Input, OnInit} from '@angular/core';
import {TreeFile, TreeNode} from './tree-view-lib';
import {TreeViewComponent} from './tree-view.component';

@Component({
  selector: 'app-tree-view-file',
  templateUrl: './tree-view-file.component.html',
  styles: []
})
export class TreeViewFileComponent implements OnInit {
  @Input() thisNode: TreeFile;
  @Input() treeView: TreeViewComponent;
  opened = false;

  constructor() { }

  ngOnInit() {
  }

  openFile() {
    this.opened = true;
    this.treeView.eTreeFileClicked.emit(this.thisNode);
  }
}
