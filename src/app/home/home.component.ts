import {Component, OnInit} from '@angular/core';
import { OverlayConfig} from 'ngx-modialog';
import {Modal, BSModalContextBuilder} from 'ngx-modialog/plugins/bootstrap';
import {ImageManagerModalContext, ImageManagerComponent} from "../shared/galal-UI/image-manager";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles:[`/*Home Component Styles*/`]
})

export class HomeComponent implements OnInit {
  overlayConfig: OverlayConfig;
  constructor(public modal: Modal) {
    //modal.overlay.defaultViewContainer = vcRef;
  }

  openModal() {
//dialogClass: 'modal-centered'
    const builder = new BSModalContextBuilder<ImageManagerModalContext>(
      {  num1: 7, num2: 3 , answer:''} as any,
      undefined,
      ImageManagerModalContext
    );

    this.overlayConfig = {
      context: builder.toJSON()
    };

    // return this.modal.open(ImageManagerComponent, this.overlayConfig);
    //this.modal.open(ImageManagerComponent, this.overlayConfig);

    this.modal.open(ImageManagerComponent,this.overlayConfig);
  }
  ngOnInit() {
  }

}
