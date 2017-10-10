import {Directive, HostBinding, HostListener, Input, ElementRef, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[Dropdown]',
  host: {'(window:click)': 'clickClose($event)'},
})
export class DropdownDirective {

  @Input() isClickable:boolean = false;


  constructor(public elementRef:ElementRef) {
  }
  @HostBinding('class.open') get opened(){
    return this.isOpen;
  }
  @HostListener('mouseenter') open(){
    if(!this.isClickable){
      this.isOpen=true;
    }

  }
  @HostListener('mouseleave') close(){
    if(!this.isClickable){
      this.isOpen=false;
    }
  }

  @HostListener('click') clickOpen(){
    if(this.isClickable){
      this.isOpen = true;
      //if(!this.elementRef.nativeElement.classList.contains('open')){
      //  this.elementRef.nativeElement.classList.add('open');
      //}
    }

  }

  //@HostListener('blur')
  clickClose(event){
    event.stopPropagation();
    if(!this.isInsideTarget(event.target)){
      if(this.isClickable && this.isOpen){
        this.isOpen = false;
      }
    }
  }

  isInsideTarget(clickedComponent){
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        return inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    return inside;
  }

  public isOpen = false;

}

export  class DropdownClickedEvevnt{
  constructor(public target:ElementRef, public opened:boolean){}
}


