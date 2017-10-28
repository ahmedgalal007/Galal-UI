import {Component, Input, OnInit} from '@angular/core';
import {TreeNode} from '../tree-view/tree-view-nodes';

@Component({
  selector: 'app-browser-view-item',
  templateUrl: './browser-view-item.component.html',
  styleUrls: ['./browser-view-item.component.css']
})
export class BrowserViewItemComponent implements OnInit {

  @Input() node: TreeNode;
  constructor() { }

  ngOnInit() {
  }

}
