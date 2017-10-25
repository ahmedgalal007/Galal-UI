import {Component, Output, Input, EventEmitter} from '@angular/core';
import {iButton} from '../iButton';
@Component({
  selector: 'li[toolbar-button]',
  template: `
      <div   class="btn btn-default btn-sm"   role="button" (click)="onClick(null)">{{data.label}} <span class="{{data.glyphicon}}"></span></div>
  `
})
export class ToolbarButtonComponent extends iButton {


}
