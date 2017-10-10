import {Component, Output, Input, EventEmitter, ViewContainerRef} from '@angular/core';
import {iButton} from "../iButton";
import {BSModalContextBuilder} from "ngx-modialog/plugins/bootstrap";
import {Modal, OverlayConfig} from "ngx-modialog";
import {PopupModalComponent, PopupFormModalContext} from "../../../modal";

@Component({
  selector: 'li[popup-form]',
  template: `<button (click)="openModal()"   class="btn btn-default btn-sm"  >{{data.label}} <span class="{{data.glyphicon}}"></span></button>`
})
export class PopupFormComponent extends iButton {

  overlayConfig: OverlayConfig;
  constructor( public modal: Modal) {
    super();
    //modal.overlay.defaultViewContainer = vcRef;
  }

  openModal() {
//dialogClass: 'modal-centered'
    const builder = new BSModalContextBuilder<PopupFormModalContext>(
      {  form: this.data.form, num2: 0 , answer:`Yes it's `} as any,
        undefined,
      PopupFormModalContext
    );
    this.overlayConfig = {
      context: builder.toJSON()
    };

    let DialogRef = this.modal.open(PopupModalComponent, this.overlayConfig );

  }

  onClick(form){
    this.data.barButton = this;
    this.data.value = form;
    this.btnClicked.emit(this.data);
  }

  processResult(Editor){
    Editor.log("Editor Btn Process Function Executed!",true);
  }

  // generateForm(){
  //
  // }
}



