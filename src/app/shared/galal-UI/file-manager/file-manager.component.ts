import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {TreeFile, TreeFolder, TreeNode} from '../tree-view/tree-view-lib';
import {FileIoService} from '../file-io.service';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  eDirectoryChanged: EventEmitter<TreeFolder> = new EventEmitter<TreeFolder>();
  eFileClicked: EventEmitter<TreeFile> = new EventEmitter<TreeFile>();
  eFolderClicked: EventEmitter<TreeFolder> = new EventEmitter<TreeFolder>();

  selectedFolder: string ;
  currentTreeNode: TreeNode;

  constructor(private http: Http, public FIO: FileIoService) {}

  ngOnInit() {
    this.currentTreeNode = this.FIO.getNode(7);
    console.log(this.currentTreeNode);
  }

  value() {

  }

  updateFolder(folder: TreeFolder) {
     this.eDirectoryChanged.emit(folder);
  }

  submitFile(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log(file);
      console.log(file.name);
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      const headers = new Headers();
      /*
          this was the culprit:
          headers.append('Content-Type', 'multipart/form-data');
          worked for me by changing it to:
      */
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const options = new RequestOptions( { headers: headers} );
      console.log(formData);
      console.log(options);
      this.http.post('./assets/data/upload-persona-document.service.php', formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
    }
  }

}
