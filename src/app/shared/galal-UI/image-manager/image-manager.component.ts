import { Component } from '@angular/core';
import {BSModalContext} from 'ngx-modialog/plugins/bootstrap';
import {ModalComponent, CloseGuard, DialogRef} from 'ngx-modialog';

export class ImageManagerModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
  public answer: string;
}

@Component ({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html'
})
export class ImageManagerComponent implements CloseGuard, ModalComponent<ImageManagerModalContext> {
  context: ImageManagerModalContext;
  wrongAnswer;
  constructor(public dialog: DialogRef<ImageManagerModalContext>) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  onKeyUp(value) {
    this.wrongAnswer = value !== (this.context.num1 + this.context.num2);
    this.context.answer = this.wrongAnswer.toString();
    this.dialog.close();
  }

 closeDiloge() {
   this.dialog.close();
 }

  beforeDismiss(): boolean {
    return true;
  }
  //
  // beforeClose(): boolean {
  //   return this.wrongAnswer;
  // }


}
