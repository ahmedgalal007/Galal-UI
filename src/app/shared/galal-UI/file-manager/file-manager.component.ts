import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {TreeFolder} from '../tree-view/tree-view-nodes';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  eDirectoryChanged: EventEmitter<TreeFolder> = new EventEmitter<TreeFolder>();
  constructor() { }

  ngOnInit() {
  }

  value() {

  }

  updateFolder(folder: TreeFolder) {
    this.eDirectoryChanged.emit(folder);
  }

}
