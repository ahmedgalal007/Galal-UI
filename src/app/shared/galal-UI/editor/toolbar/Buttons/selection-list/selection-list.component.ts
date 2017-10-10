import {Component, Output, EventEmitter, Input} from '@angular/core';
import {iButton} from "../iButton";

@Component({
  selector: 'li[selection-list]',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css']
})
export class SelectionListComponent extends iButton {

}
