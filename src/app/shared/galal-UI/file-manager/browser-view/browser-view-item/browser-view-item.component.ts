import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeFolder, TreeNode} from '../../../tree-view/tree-view-lib';
import { TreeNodeType } from '../../../tree-view/tree-view-lib';
import {BrowserViewComponent} from '../browser-view.component';

@Component({
  selector: 'app-browser-view-item',
  templateUrl: './browser-view-item.component.html',
  styleUrls: ['./browser-view-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BrowserViewItemComponent implements OnInit {
  TreeNodeType = TreeNodeType;
  @Input() node: TreeNode;
  @Input() browserView: BrowserViewComponent;

  constructor() { }

  ngOnInit() {
  }

  clickFolder() {
    this.browserView.Nodes = this.browserView.fileManager.FIO.getChildrens(this.node.id);
    this.browserView.fileManager.currentTreeNode = this.node;
    this.browserView.fileManager.selectedFolder = this.browserView.fileManager.FIO.getPath(this.node).join('/');
  }

  clickFile() {
    this.browserView.fileManager.currentTreeNode = this.node;
  }
}
