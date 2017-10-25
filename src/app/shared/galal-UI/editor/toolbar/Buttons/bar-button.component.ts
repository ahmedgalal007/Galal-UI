import {
  Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver,
  EventEmitter, ElementRef, ViewEncapsulation, SystemJsNgModuleLoader
} from '@angular/core';
import {BtnItem} from './BtnItem.component';
import {ButtonDirective} from './button.directive';
import {iButton} from './iButton';
import {CompoboxComponent} from './compobox/compobox.component';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {Subscription} from 'rxjs';

import {ToolbarButtonComponent} from './toolbar-button/toolbar-button.component';
import {SelectionListComponent} from './selection-list/selection-list.component';
import {GridPickerComponent} from './grid-picker/grid-picker.component';
import {PopupFormComponent} from './popup-form/popup-form.component';


@Component({
  host: { '(window:click)': 'adjustToolbar($event)', '(window:resize)': 'onWindowResize($event)'},
  selector: 'bar-buttons',
  template: `
    <ul class="editor-toolbar {{bar.rtl?'toolbar-rtl':'toolbar-ltr'}} {{bar.BtnRTL?'':'rvBtnRTL'}}" >
        <ng-template tool-Btn></ng-template>
    </ul>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['bar-button.component.css']
})
export class BarButtonComponent implements OnInit, AfterViewInit, OnDestroy {
  editor: ElementRef;
  // @Input() btns: BtnItem[];
  @Input() bar: any;
  @ViewChild(ButtonDirective) btnHost: ButtonDirective;

  public barBtnClicked: EventEmitter<any> = new EventEmitter<any>();
  subscriptions: Subscription[] = [];

  constructor ( public elementRef: ElementRef,
                private _componentFactoryResolver: ComponentFactoryResolver,
              // private loader: SystemJsNgModuleLoader,
  ) { }

  ngOnInit () {
    this.loadComponent();
  }

  ngAfterViewInit () {
  }

  loadComponent () {
    // this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    const viewContainerRef = this.btnHost.viewContainerRef;
    viewContainerRef.clear();
    for ( const btn of this.bar.buttons as BtnItem[] ) {
      // let btn:BtnItem = this.bar.buttons[0];
      console.log(btn.component + ' - Now Testing');
      const btnItem = this.createBtnItemCompoent(btn);
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(btnItem.component);
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<iButton>componentRef.instance).data = btnItem.data;
      this.subscriptions.push((componentRef.instance).btnClicked.subscribe((data) => {
        this.barBtnClicked.emit(data);
      }));
    }



  }

  createBtnItemCompoent (btn) {
    let component;
    switch ( btn.component ) {
      case 'ToolbarButtonComponent':
            component = ToolbarButtonComponent;
            break;
      case 'SelectionListComponent':
            component = SelectionListComponent;
            break;
      case 'ColorPickerComponent':
            component = ColorPickerComponent;
            break;
      case 'CompoboxComponent':
            component = CompoboxComponent;
            break;
      case 'GridPickerComponent':
            component = GridPickerComponent;
            break;
      case 'PopupFormComponent':
        component = PopupFormComponent;
        break;
      default:
            component = ToolbarButtonComponent;
    }
    return new BtnItem(component, btn.data);
  }


  ngOnDestroy() {

  }


  adjustToolbar ( evnt ) {

    if (this.isInsideTarget(evnt.target, this.elementRef.nativeElement)) {

      const frame = this.editor.nativeElement.getElementsByTagName('iframe')[0] ?
        this.editor.nativeElement.getElementsByTagName('iframe')[0] :
        this.editor.nativeElement;
      if (evnt instanceof Event && evnt.target) {
        let drpDwn = this.getParentFromElement(evnt.target, (element) => {
          return element.getElementsByClassName('dropdown')[0];
        });

        if (drpDwn && drpDwn.getElementsByClassName) {
          drpDwn = drpDwn.getElementsByClassName('dropdown-menu')[0];
        }
        this.adjustDdDirection(drpDwn, frame);
      }
    }
  }



  onWindowResize (event) {
    const frame = this.editor.nativeElement.getElementsByTagName('IFRAME')[0] ?
      this.editor.nativeElement.getElementsByTagName('iframe')[0] :
      this.editor.nativeElement;

    for (const item of this.elementRef.nativeElement.getElementsByClassName('dropdown-menu')) {
      // console.log(item);
      this.adjustDdDirection(item, frame);
    }
  }


  adjustDdDirection (drpDwn, frame) {
    // if(drpDwn) {
    console.log(drpDwn);

    const drpdwnOffset = this.cumulativeOffset(drpDwn);
    const editorOffset = this.cumulativeOffset(frame);

    // console.log("dropdown :" + drpdwnOffset.left + " : " + drpDwn.offsetWidth);

    if (drpdwnOffset.left < 0 ) {
      drpDwn.setAttribute('style', 'left: 0 !important') ;
      // drpDwn.style.left = ' 0px !important' ;
    }else if ((drpdwnOffset.left + drpDwn.offsetWidth) > (editorOffset.left + frame.offsetWidth)) {
      drpDwn.setAttribute('style', '') ;
    }
    // }
  }

  cumulativeOffset (element) {
    let top = 0, left = 0;
    do {
      top += element.offsetTop  || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  }

  isInsideTarget (clickedComponent, target) {
    let inside = false;
    do {
      if (clickedComponent === target) {
        return inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    return inside;
  }

  // editor = this.getParentFromElement(clickedComponent, (element)=>{
  //   return element.classList.contains('ng-editor')
  // });
  getParentFromElement (element, filter) {
    let parent;
    do {
      if (element && filter(element)) {
        parent = element;
        break;
      }
      element = element.parentNode;
    } while (element);

    return parent;
  }

}
