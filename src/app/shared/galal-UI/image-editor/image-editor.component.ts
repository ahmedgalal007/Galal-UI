import {
  AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import {Bounds, CropperSettings, CropPosition, ImageCropperComponent} from 'ng2-img-cropper';

@Component({
  selector: 'app-image-editor',
  styleUrls: ['./image-editor.component.css'],
  templateUrl: './image-editor.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ImageEditorComponent implements OnInit, AfterViewChecked {
  @Input() files: File[];
  @Output() getCropFiles: EventEmitter<any> = new EventEmitter<any>();
  cropFiles: CropFile[] = [];
  // @ViewChild('fileList', undefined)
  // fileList: HTMLSelectElement;
  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  @ViewChild('AspectList', HTMLElement) aspectList;
  AspectW = 4; AspectH = 3;
  Aspects = ['4/3', '16/9', '1/1'];
  // bounds: Bounds;
  currImg;
  KeepAspect = false;
  viewLoaded = false;
  selectedAspectFile: CropFile;
  // boundList: Bounds[];

  activeAspectInput: HTMLInputElement;
  activeAspectIndex = 0;

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.dynamicSizing = true;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 600;
    this.cropperSettings.canvasHeight = 400;
    // this.cropperSettings.preserveSize = true;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.keepAspect = this.KeepAspect;
    this.cropperSettings.cropperClass = 'ng2-cropper-canvas';
    this.data = {};
    // this.cropper.cropper.getCropBounds();

    // this.populateCropFiles();
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    if (!(this.cropFiles.length > 0)) {
      this.populateCropFiles();
    }

    if (!this.viewLoaded) {

      this.cropper.onCrop.subscribe((bound: Bounds) => {
        console.log('onCrop');
        this.updateCropperHeight();
        this.cropper.croppedHeight = (bound.width * this.AspectH) / this.AspectW;
        this.cropperSettings.croppedHeight = (this.cropperSettings.croppedWidth * this.AspectH) / this.AspectW;
        this.cropper.settings.croppedHeight = (this.cropperSettings.croppedWidth * this.AspectH) / this.AspectW;
        if (this.activeAspectInput && this.activeAspectInput.nodeName === 'INPUT') {
          this.activeAspectInput.value = this.BoundsToString(this.cropper.cropper.getCropBounds());
          const aspectBound = this.selectedAspectFile.aspectBounds[this.activeAspectIndex];
          if (aspectBound) {
            // this.selectedAspectFile.aspectBounds.filter((aspect) => {
            //   return aspect.Aspect ===  this.AspectW + '/' + this.AspectH;
            // })[0].bound = this.cropper.cropper.getCropBounds();

            this.selectedAspectFile.aspectBounds[this.activeAspectIndex].bound  = this.cropper.cropper.getCropBounds();
          }
        }
      });
      this.viewLoaded = true;
    }
  }



  updateCropperHeight() {
    const pos = this.cropper.cropper.getCropBounds();
    const height = (pos.width * this.AspectH) / this.AspectW;
    this.cropper.cropper.updateCropPosition( new Bounds(pos.left, pos.top, pos.width, height) );
  }



  eFileListChange($event) {
    const that = this;
    const image: any = new Image();
    console.log($event.target);
    this.AspectH = this.AspectW = 0;
    // Load the image
    const myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      image.onload = function () {
        that.cropperSettings.canvasWidth = this.width;
        that.cropperSettings.canvasHeight = this.height;
      };
      that.currImg = image;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(this.cropFiles[$event.target.tabIndex].file);

    // Update the List Style
    $event.target.parentNode.childNodes.forEach((child) => {
      if (child.classList ) {
        child.classList.remove('active');
      }
    });
    $event.target.classList.add('active');
    // Save the previous file and set the new one
    if (this.selectedAspectFile) { this.cropFiles[this.selectedAspectFile.index].copy(this.selectedAspectFile); }
    this.selectedAspectFile = this.cropFiles[$event.target.tabIndex];
    this.activeAspectInput = null;
    // Get the first Aspect Input value
    // const dimentions = this.selectedAspectFile.aspectBounds[0].Aspect.split('/');
    // this.AspectW = Number(dimentions[0]);
    // this.AspectH = Number(dimentions[1]);

    // Update the cropper position
    if (this.activeAspectInput) {
      // this.cropper.cropper.updateCropPosition(
      // this.StringToBound(this.aspectList.childNodes[0].getElementsByTagName('INPUT').value));
      this.cropper.cropper.updateCropPosition( this.selectedAspectFile.aspectBounds[0].bound);
    }

    // this.cropper.cropPositionChange.subscribe((cropPosition: CropPosition) => {
    //
    // });

  }

  eInputChange($event) {
    this.cropper.cropper.updateCropPosition(this.StringToBound($event.target.value));
    this.selectedAspectFile.aspectBounds[this.activeAspectIndex].bound = this.cropper.cropper.getCropBounds();
  }

  onBoundSelect($event) {
    const input = $event.target.parentNode.parentNode.getElementsByClassName('form-control')[0];
    this.activeAspectInput = input;
    this.activeAspectIndex = $event.target.tabIndex;

    this.setAspectRatio($event);

    this.cropper.cropper.updateCropPosition(this.StringToBound(input.value));
    this.selectedAspectFile.aspectBounds[this.activeAspectIndex].bound = this.cropper.cropper.getCropBounds();
  }

  setAspectRatio($event) {
    const dimentions = $event.target.innerText.split('/');
    const childs = $event.target.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('button');
    console.log(childs);
    for (let i = 0 ; i < childs.length; i++) {
      if (childs[i].nodeName === 'BUTTON') {
        childs[i].classList.remove('btn-danger');
        childs[i].classList.add('btn-default');
      }
    }
    $event.target.classList.remove('btn-default');
    $event.target.classList.add('btn-danger');
    this.AspectW = dimentions[0];
    this.AspectH = dimentions[1];
    this.updateCropperHeight();
  }

  populateCropFiles() {
    delete this.cropFiles;
    this.cropFiles = [];
    let index = 0;
    this.files.forEach((file) => {
      const cropfile = new CropFile();
      cropfile.file = file;
      cropfile.index = index;
      this.Aspects.forEach((aspect) => {
        const aspectBound = new AspectBound();
        aspectBound.Aspect = aspect;
        aspectBound.bound = new Bounds( 0, 0, 100, 100 );
        cropfile.aspectBounds.push(aspectBound);
      });
      this.cropFiles.push(cropfile);
      index += 1;
    });
  }

 BoundsToString(bound: Bounds) {
    return bound.left + ',' + bound.top + ',' + bound.width + ',' + bound.height;
 }
 StringToBound(value: string) {
   const boundArr = value.split(',');
   console.log(boundArr);
   const bound: Bounds = new Bounds( Number(boundArr[0]), Number(boundArr[1]), Number(boundArr[2]),
                                     (Number(boundArr[2]) * this.AspectH) / this.AspectW);
   return bound;
 }

 postFiles() {
    this.getCropFiles.emit(this.cropFiles);
 }
}

class AspectBound {
  bound: Bounds ;
  Aspect: string;
}
class CropFile {
  index = 0;
  file: File;
  aspectBounds: AspectBound[] = [];
  persons: string[] = [];
  places: string[] = [];
  events: string[] = [];

  copy(CFile: CropFile) {
    this.aspectBounds = CFile.aspectBounds;
    this.index = CFile.index;
    this.file = CFile.file;
    this.events = CFile.events;
    this.persons = CFile.persons;
    this.places = CFile.places;
  }
}

