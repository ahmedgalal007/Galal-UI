import {Component, EventEmitter, Output, Input} from '@angular/core';
import {iButton} from "../iButton";

@Component({
  selector: 'li[compobox]',
  templateUrl: './compobox.component.html',
  styleUrls: ['./compobox.component.css']
})
export class CompoboxComponent extends iButton {

  onClick(option) {
    this.data.barButton = this;
    this.data.value = option;
    this.data.label = this.data.value;
    this.btnClicked.emit(this.data)
  }
  processResult(result){

  }
}
