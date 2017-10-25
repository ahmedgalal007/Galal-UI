import {Component, OnInit} from '@angular/core';
import { OverlayConfig} from 'ngx-modialog';
import {Modal, BSModalContextBuilder, BootstrapModalSize, BSModalContext} from 'ngx-modialog/plugins/bootstrap';
import {ImageManagerModalContext, ImageManagerComponent} from '../shared/galal-UI/image-manager';
import {overrideOptions} from "@angular/cli/utilities/override-options";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`/*Home Component Styles*/`]
})

export class HomeComponent implements OnInit {
  overlayConfig: OverlayConfig;
  constructor(public modal: Modal) {
    // modal.overlay.defaultViewContainer = vcRef;
  }

  openModal() {
// dialogClass: 'modal-centered'
    const builder = new BSModalContextBuilder<ImageManagerModalContext>(
      {  num1: 7, num2: 3 , answer: '', size: 'lg'} as any ,
      undefined ,
      ImageManagerModalContext
    );

    const moContext = builder.toJSON();
    moContext.dialogClass = 'modal-dialog container';
    this.overlayConfig = {
      context: moContext
    };

    // return this.modal.open(ImageManagerComponent, this.overlayConfig);
    // this.modal.open(ImageManagerComponent, this.overlayConfig);

    this.modal.open( ImageManagerComponent, this.overlayConfig );
  }
  ngOnInit() {
  }

}
