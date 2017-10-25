import {Component, Input, OnInit} from '@angular/core';
import {TreeNode} from './tree-view-nodes';

@Component({
  selector: 'app-tree-view-file',
  templateUrl: './tree-view-file.component.html',
  styles: []
})
export class TreeViewFileComponent implements OnInit {
  @Input() thisNode: TreeNode;
  opened = false;
  ext;
  constructor() { }

  ngOnInit() {
  }

  openFile() {
    this.opened = true;
  }
}
