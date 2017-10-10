import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {iButton} from "../iButton";
//import {BtnItem} from "../BtnItem.component";

@Component({
  selector: 'li[color-picker]',
  templateUrl: './color-picker.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent extends iButton {

}
