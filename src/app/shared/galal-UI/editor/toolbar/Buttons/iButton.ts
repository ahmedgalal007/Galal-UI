//import {BtnItem} from "./BtnItem.component";
import {Component, Output, EventEmitter, Input, ViewChild, ElementRef} from '@angular/core';
import {EditorComponent} from "../../editor.component";
/**
 * Created by ahmedgalal on 3/29/17.
 */

export class iButton{
  @Output() btnClicked = new EventEmitter<iButton>();
  @Input() data:any;
  onClick(val){
    this.data.barButton = this;
    this.data.value = val;
    this.btnClicked.emit(this.data);
  }
  processResult(Editor:EditorComponent){}
}
