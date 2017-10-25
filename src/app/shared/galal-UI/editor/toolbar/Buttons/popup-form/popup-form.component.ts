import {Component, Output, Input, EventEmitter, ViewContainerRef} from '@angular/core';
import {iButton} from '../iButton';
import {BSModalContextBuilder} from 'ngx-modialog/plugins/bootstrap';
import {Modal, OverlayConfig} from 'ngx-modialog';
import {PopupModalComponent, PopupFormModalContext} from '../../../modal';

@Component({
  selector: 'li[popup-form]',
  template: `<button (click)="openModal()"   class="btn btn-default btn-sm"  >{{data.label}} <span class="{{data.glyphicon}}"></span></button>`
})
export class PopupFormComponent extends iButton {

  DialogRef;
  overlayConfig: OverlayConfig;
  constructor( public modal: Modal) {
    super();
    // modal.overlay.defaultViewContainer = vcRef;
  }

  result: any;

  getInput(inputs, name) {
    inputs.forEach((input) => {

      if (input['name'] === name)  {
        console.log(input.name + ': ' + name);
        return input;
      }
    });
    // return false;
  }
  openModal() {
  // dialogClass: 'modal-centered'
    const builder = new BSModalContextBuilder<PopupFormModalContext>(
      {  form: this.data.form, result: ''} as any,
        undefined,
      PopupFormModalContext
    );
    this.overlayConfig = {
      context: builder.toJSON()
    };


     this.DialogRef = this.modal.open(PopupModalComponent, this.overlayConfig ).then(resultPromise => {
       return resultPromise.result
         .then(
           result => {

             // result.inputs.forEach((input) => {
             //   if (input['name'] === 'personLink')  {
             //     this.result = input;
             //   }
             // });
              // if (this.result) {
                // this.result = this.result.value[0].url;
             alert(JSON.stringify( result ));
             this.result = result;
                this.onClick(result);
              // }

           },
           () => console.log('Rejected')
         );
     });
  }

  onClick(form) {
    this.data.barButton = this;
    // this.data.value = form;

    this.data.callbackArgs = [this.result];
    if (typeof this.data.callback !== 'function') {
      eval ( 'this.data.callback = ' + this.data.callback.join(' '));
    }

    this.btnClicked.emit(this.data);
  }

  processResult(Editor) {
    // Editor.log('Editor Btn Process Function Executed!', false);
    // Editor.DOM.execCommand('CreateLink', false, this.result);
  }

  // generateForm(){
  //
  // }
}



