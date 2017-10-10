import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[tool-Btn]'
})
export class ButtonDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
