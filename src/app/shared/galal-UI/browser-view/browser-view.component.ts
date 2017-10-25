import {Component, Input, OnInit} from '@angular/core';
import {TreeFolder} from '../tree-view/tree-view-nodes';
import {FileManagerComponent} from '../file-manager/file-manager.component';

@Component({
  selector: 'app-browser-view',
  templateUrl: './browser-view.component.html',
  styleUrls: ['./browser-view.component.css']
})
export class BrowserViewComponent implements OnInit {

  @Input() browsURL;
  @Input() fileManager: FileManagerComponent;

  constructor() {
  }

  ngOnInit() {
    this.fileManager.eDirectoryChanged.subscribe(( folder ) => {
      folder.expanded = true;
    });
  }

}
