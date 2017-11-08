import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class FileUploadService {
  /**
   * @param Observable<number>
   */
  private progress$: Observable<number>;

  /**
   * @type {number}
   */
  private progress = 0;

  private progressObserver: any;

  constructor() {
    this.progress$ = new Observable(observer => {
      this.progressObserver = observer;
    });
  }

  /**
   * Set interval for frequency with which Observable inside Promise will share data with subscribers.
   *
   * @param interval
   */
  private static setUploadUpdateInterval(interval: number): void {
    setInterval(() => {
    }, interval);
  }

  /**
   * @returns {Observable<number>}
   */
  public getObserver(): Observable<number> {
    return this.progress$;
  }

  /**
   * Upload files through XMLHttpRequest
   *
   * @param url
   * @param files
   * @returns {Promise<T>}
   */
  public upload(url: string, files: File[], destination: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('destination', destination);
      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }
      console.log(formData.getAll('uploads[]'));

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      FileUploadService.setUploadUpdateInterval(500);

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);

        this.progressObserver.next(this.progress);
      };



      xhr.open('POST', url, true);
      // xhr.setRequestHeader( 'enctype', 'multipart/form-data');
      xhr.setRequestHeader( 'Accept', 'application/json');
      // xhr.setRequestHeader( 'Content-Type', 'application/json');
      // xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*'); x-www-form-urlencoded

      xhr.send(formData);
    });
  }

}
