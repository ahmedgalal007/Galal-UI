import {Component, ElementRef} from '@angular/core';
import {CloseGuard, ModalComponent, DialogRef} from 'ngx-modialog';
import {BSModalContext} from 'ngx-modialog/plugins/bootstrap';
/**
 * Created by ahmedgalal on 9/30/17.
 */

export class PopupFormModalContext extends BSModalContext {
  public form: any;
  public result: string;
}

@Component({
  selector: 'modal-content',
  templateUrl: './modal.html' // ,
  // styleUrls: ['./image-manager.component.css']
})
export class PopupModalComponent implements  CloseGuard, ModalComponent<PopupFormModalContext> {
  context: PopupFormModalContext;
  _buildInputFactory: any;
  inputs: any;
  returnedResult: any;

  constructor(public dialog: DialogRef<PopupFormModalContext>) {
    this.context = dialog.context;
    this.inputs = this.context.form.inputs;
    this._buildInputFactory = BuildInputFactory;
    dialog.setCloseGuard(this);
  }

  onSubmit(myForm) {
    console.log(myForm.form.controls);
    // myForm.form.controls.forEach((control) => {
    //   this.dialog.context.form.inputs.forEach( (dlgInput) => {
    //     if (control.name === dlgInput.getAttribute('name')) {
    //       dlgInput.value = control.value ;
    //     }
    //   });
    // });

    this.dialog.context.form.inputs.forEach( (dlgInput) => {
      const input = myForm.form.controls[dlgInput.name];
      if (input) {
        dlgInput.value = input.value;
      }
    });
    // console.log( this.dialog.context.form);
    this.dialog.result
      .then( result => {
        // alert(  result );
      });
  }

  // onBlur() {}
  onChange(el: HTMLInputElement) {
    this.dialog.context.form.inputs.forEach(( input ) => {
      if (input.tag !== 'input' && el.attributes && input.name === el.attributes['ng-reflect-name'].value ) {
         input.value = el.value;
        console.log( el );
        console.log( input );
      }
    });
  }

  closeDialog(myForm) {
    this.onSubmit(myForm);
    this.dialog.close(this.context.form);
  }

  beforeDismiss(): boolean {
    return true;
  }

  // beforeClose(): boolean {
  //   return true;
  // }

  calcReturnValue() {

  }

}

export class BuildInputFactory {
  static build (input: any) {
    return '<' + 'input type="' + input.type + '" name="' + input.name
               + '" class="' + input.classes + '" value="' + input.value + '" >' +
               + input.value
         + '</' + 'input' + '>';
  }
}

