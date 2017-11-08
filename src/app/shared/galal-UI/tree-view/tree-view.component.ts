import {Component, EventEmitter, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from '@angular/http';
import {TreeFile, TreeFolder, TreeNode, TreeNodeType} from './tree-view-lib';
import {FileManagerComponent} from '../file-manager/file-manager.component';
import {FileIoService} from '../file-io.service';
// import {forEach} from '@angular/router/src/utils/collection';
// import {variable} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TreeViewComponent implements OnInit {

  @Input() browsURL: string;
  @Input() fileManager: FileManagerComponent;
  eTreeFileClicked: EventEmitter<TreeFile> = new EventEmitter<TreeFile>();
  eTreeFolderClicked: EventEmitter<TreeFolder> = new EventEmitter<TreeFolder>();
  rootTreeNodes: TreeNode[];

  constructor(private FIO: FileIoService, private http: Http) {
    this.rootTreeNodes = this.FIO.getChildrens(0);
    console.log(this.rootTreeNodes);
    // http.get(this.browsURL).subscribe( (result)  => {
    //    return this.rootTreeNode = new TreeNode();
    // });

    this.eTreeFileClicked.subscribe((file: TreeFile) => {
      this.fileManager.eFileClicked.emit(file);
      this.fileManager.currentTreeNode = file;
      this.updateAllNodes();
    });

    this.eTreeFolderClicked.subscribe((folder: TreeFolder) => {
      this.fileManager.eFolderClicked.emit(folder);
      this.fileManager.currentTreeNode = folder;
      this.updateAllNodes();
    });

  }

  ngOnInit() {
  }

  updateFolder(folder: TreeFolder) {
    this.fileManager.updateFolder(folder);
  }
  populateChildes() {}

  colapseNode(node: any) {}

  expandNode(node: any) {}

  updateAllNodes() {
    this.rootTreeNodes.forEach((node: TreeFolder) => {
      this.setNodeState(node);
      });
  }

  setNodeState(node: TreeFolder) {
    const pathArr: Array<string> = this.FIO.getPath(node);
    if (node.childrens && node.childrens.length > 0) {
      for (const child of  node.childrens) {
        child.expanded = false;
        child.opened = false;
        if ( pathArr.includes(child.name) ) {
          child.expanded = true;
          child.opened = true;
        }
        this.setNodeState(child);
      }
    }
  }

}









