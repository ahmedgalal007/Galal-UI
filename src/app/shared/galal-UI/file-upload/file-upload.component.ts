import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FileUploadService} from '../file-upload.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() uploadRoute;
  @Input() uploadDestinationFolder;
  imgPosts = [];
  psdTemplates = [];
  isSubmitted = false;
  progressBarVisibility = true;
  uploadProgress = 0;
  redirectRoute ;
  router: Router;
  // Events
  eFilesUploaded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fileUploadService: FileUploadService, private route: ActivatedRoute) {
    this.redirectRoute = route.url;
  }

  ngOnInit() {
  }

  /**
   * @param fileInput
   */
  public fileSelectionHandler (fileInput: any) {
    this.psdTemplates = [];
    const FileList: FileList = fileInput.files;
    for (let i = 0, length = FileList.length; i < length; i++) {
      this.psdTemplates.push(FileList.item(i));
      console.log(FileList.item(i).name);
    }

    this.progressBarVisibility = true;
  }
  public cropFilesListener(cropFiles) {
    this.imgPosts = cropFiles;
  }
  public async fileUploadHandler (Resolve, Reject): Promise<any> {
    let result: any;

    if (!this.psdTemplates.length) {
      return;
    }

    this.isSubmitted = true;

    this.fileUploadService.getObserver()
      .subscribe(progress => {
        this.uploadProgress = progress;
      });

    try {
       result = await this.fileUploadService.upload(this.uploadRoute, this.psdTemplates, this.uploadDestinationFolder).then(
         (files) => {
           return files;
         });
    } catch (error) {
       document.write(error);
    }

    // result.then((url: string, files: File[]) => {

    // });
    // if (!result['images']) {
    //   return;
    // }
console.log(result);
    this.saveUploadedTemplatesData(result['images']);
    // this.redirectService.redirect(this.redirectRoute);
 // this.router.navigate([this.redirectRoute]);
    // this.router.navigate(['/login'], { queryParams: { returnUrl: this.redirectRoute }});
  }

  saveUploadedTemplatesData(result: any) {
    return result;
  }
}
