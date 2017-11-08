import {Component, Input, OnInit} from '@angular/core';
import {TreeFile, TreeFolder} from '../../tree-view/tree-view-lib';
import {FileManagerComponent} from '../file-manager.component';
import {FileIoService} from '../../file-io.service';

@Component({
  selector: 'app-browser-view',
  templateUrl: './browser-view.component.html',
  styleUrls: ['./browser-view.component.css']
})
export class BrowserViewComponent implements OnInit {

  @Input() browsURL;
  @Input() fileManager: FileManagerComponent;
  rowCount = 4;
  Nodes = [];

  constructor(private FIO: FileIoService) {
  }

  ngOnInit() {
    this.Nodes = this.FIO.nodes();
      // .sort((A, B) => {
      //   return A.nodeType > B.nodeType;
      // });
    this.fileManager.eDirectoryChanged.subscribe(( folder: TreeFolder ) => {
      folder.expanded = true;
    });

    this.fileManager.eFileClicked.subscribe(( file: TreeFile ) => {
      console.log(file.name);
    });

    this.fileManager.eFolderClicked.subscribe(( folder: TreeFolder ) => {
      this.Nodes = this.FIO.getChildrens(folder.id);
    });
  }

}
