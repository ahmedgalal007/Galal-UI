import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from '@angular/http';
import {TreeFolder, TreeNode} from './tree-view-nodes';
import {FileManagerComponent} from '../file-manager/file-manager.component';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TreeViewComponent implements OnInit {

  @Input() browsURL: string;
  @Input() fileManager: FileManagerComponent;
  rootTreeNode: TreeNode;

  constructor(private http: Http) {
    this.rootTreeNode = new TreeFolder(1, 'Folder', 'root', '/');
    // http.get(this.browsURL).subscribe( (result)  => {
    //    return this.rootTreeNode = new TreeNode();
    // });

  }

  ngOnInit() {
  }

  updateFolder(folder: TreeFolder) {
    this.fileManager.updateFolder(folder);
  }
  populateChildes() {}

  colapseNode(node: any) {}

  expandNode(node: any) {}

}









