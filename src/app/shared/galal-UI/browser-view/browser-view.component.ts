import {Component, Input, OnInit} from '@angular/core';
import {TreeFolder} from '../tree-view/tree-view-nodes';
import {FileManagerComponent} from '../file-manager/file-manager.component';
import {FileIoService} from '../file-io.service';

@Component({
  selector: 'app-browser-view',
  templateUrl: './browser-view.component.html',
  styleUrls: ['./browser-view.component.css']
})
export class BrowserViewComponent implements OnInit {

  @Input() browsURL;
  @Input() fileManager: FileManagerComponent;
  rowCount = 4;
  files = [];

  constructor(private FIO: FileIoService) {
  }

  ngOnInit() {
    this.files = this.FIO.nodes();
      // .sort((A, B) => {
      //   return A.nodeType > B.nodeType;
      // });
    this.fileManager.eDirectoryChanged.subscribe(( folder ) => {
      folder.expanded = true;
    });
  }

}
