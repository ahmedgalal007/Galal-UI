import {Component} from "@angular/core";
import {CloseGuard, ModalComponent, DialogRef} from "ngx-modialog";
import {BSModalContext} from "ngx-modialog/plugins/bootstrap";
/**
 * Created by ahmedgalal on 9/30/17.
 */

export class PopupFormModalContext extends BSModalContext{
  public form: any;
  public num2: number;
  public answer: string;
}

@Component({
  selector: 'modal-content',
  templateUrl: './modal.html'//,
  // styleUrls: ['./image-manager.component.css']
})
export class PopupModalComponent implements  CloseGuard, ModalComponent<PopupFormModalContext> {
  context: PopupFormModalContext;
  _buildInputFactory: any;
  inputs: any;

  constructor(public dialog: DialogRef<PopupFormModalContext>) {
    this.context = dialog.context;
    this.inputs = this.context.form.inputs;
    this._buildInputFactory = buildInputFactory;
    dialog.setCloseGuard(this);
  }


  closeDialog(){
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  // beforeClose(): boolean {
  //   return true;
  // }

  calcReturnValue(){

  }

}

export class buildInputFactory{
  static build (input:any){
    return '<' + 'input type="' + input.type + '" name="' + input.name + '" class="' + input.classes + '" value="' + input.value + '" ' + '>' + input.value + '</' + 'input' + '>';
  }
}

