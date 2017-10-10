// import {
//   Component, OnInit, EventEmitter, Input, ElementRef, ViewChildren, QueryList,
//   AfterViewInit, HostBinding
// } from '@angular/core';
// import {DropdownClickedEvevnt, DropdownDirective} from "../../dropdown.directive";
// import {isUndefined} from "util";
// import {ToolbarButton} from "../classes/schemas";
// import {EnumToolbarButtonType} from "../classes/enums";
// import  'rxjs/Rx';
// import {EditorComponent} from "../editor.component";
//
// @Component({
//   selector: '[galal-ui-editor-toolbar]',
//   templateUrl: 'editor-toolbar.component.html',
//   styleUrls: ['editor-toolbar.component.css'],
//   host: { '(window:click)': 'adjustToolbar($event)','(window:resize)': 'onWindowResize($event)'}//'(window:resize)': 'onWindowResize($event)'
// })
// export class EditorToolbarComponent implements OnInit, AfterViewInit {
//   editor:ElementRef;
//   @Input() toolbarConfig:any;
//   @ViewChildren('dropdownInput') dropdownInputs:QueryList<ElementRef> ;
//   public enumToolbarButtonType = EnumToolbarButtonType;
//   public buttons: ToolbarButton[] = [] ;
//   button:ToolbarButton ;
//   public toolBarBtnClicked: EventEmitter<ToolbarButton> = new EventEmitter<ToolbarButton>();
//
//   public JSON;
//   rtl:boolean = false;
//   BtnRTL:boolean = false;
//   // constructor(buttons: EditorButtonComponent[]) {
//   //   if(!isUndefined(buttons || buttons.length > 0)){
//   //     //this.buttons = buttons;
//   //   }
//   // }
//   constructor(public elementRef:ElementRef){
//     this.JSON = JSON;
//   }
//
//
//   ngOnInit() {
//     if(this.toolbarConfig.active)
//     this.loadButtons();
//   }
//
//   ngAfterViewInit(){
//     this.loadInputAttrs();
//   }
//
//   loadButtons(){
//     this.rtl = this.toolbarConfig.rtl;
//     this.BtnRTL = this.toolbarConfig.BtnRTL;
//     for(let btn of this.toolbarConfig.buttons){
//       if(!btn.events) btn.events = [];
//       this.buttons.push(new ToolbarButton(btn.name,btn.type as EnumToolbarButtonType,btn.args,btn.glyphicon,btn.events));
//     }
//     //console.log(this.buttons);
//   }
//
//   loadInputAttrs(){
//     this.dropdownInputs.forEach((item)=>{
//       let input = item.nativeElement.getElementsByClassName('dropdown-input')[0];
//       let Attrs = JSON.parse(input.getAttribute('all'));
//
//       for(let name in Attrs){
//         if(name == "class"){
//           Attrs[name].split(' ').forEach((item)=>{
//             input.classList.add(item);
//           });
//         }else{
//           input.setAttribute(name,Attrs[name]);
//           //console.log(name + ":" + Attrs[name]);
//         }
//       }
//       input.removeAttribute('all');
//     })
//
//   }
//
//   onBtnClicked(event){
//     this.button = event;
//     this.toolBarBtnClicked.emit(this.button);
//     //console.log(event);
//   }
//
//
//   adjustToolbar(evnt){
//
//     if(this.isInsideTarget(evnt.target)){
//
//       let frame = this.editor.nativeElement.getElementsByTagName('iframe')[0]?
//                   this.editor.nativeElement.getElementsByTagName('iframe')[0]:
//                   this.editor.nativeElement;
//       if(evnt instanceof Event && evnt.target){
//         let drpDwn = this.getParentFromElement(evnt.target, (element)=>{
//                         return element.getElementsByClassName('dropdown')[0];
//                       });
//
//         if(drpDwn && drpDwn.getElementsByClassName)
//           drpDwn = drpDwn.getElementsByClassName('dropdown-menu')[0];
//
//         this.adjustDdDirection(drpDwn,frame);
//       }
//     }
//   }
//
//
//
//   onWindowResize(event){
//
//     let frame = this.editor.nativeElement.getElementsByTagName('IFRAME')[0]?
//                 this.editor.nativeElement.getElementsByTagName('iframe')[0]:
//                 this.editor.nativeElement;
//
//     for(let item of this.elementRef.nativeElement.getElementsByClassName('dropdown-menu')){
//       // console.log(item);
//       this.adjustDdDirection(item,frame)
//
//     }
//
//   }
//
//
//   adjustDdDirection(drpDwn, frame){
//     //if(drpDwn) {
//     console.log(drpDwn);
//
//     let drpdwnOffset = this.cumulativeOffset(drpDwn);
//     let editorOffset = this.cumulativeOffset(frame);
//
//     //console.log("dropdown :" + drpdwnOffset.left + " : " + drpDwn.offsetWidth);
//
//     if(drpdwnOffset.left < 0 ) {
//       drpDwn.setAttribute('style','left: 0 !important') ;
//       //drpDwn.style.left = ' 0px !important' ;
//     }else if((drpdwnOffset.left + drpDwn.offsetWidth) > (editorOffset.left + frame.offsetWidth)){
//       drpDwn.setAttribute('style','') ;
//     }
//     //}
//   }
//
//   cumulativeOffset(element) {
//     let top = 0, left = 0;
//     do {
//       top += element.offsetTop  || 0;
//       left += element.offsetLeft || 0;
//       element = element.offsetParent;
//     } while(element);
//
//     return {
//       top: top,
//       left: left
//     };
//   };
//
//   isInsideTarget(clickedComponent){
//     var inside = false;
//     do {
//       if (clickedComponent === this.elementRef.nativeElement) {
//         return inside = true;
//       }
//       clickedComponent = clickedComponent.parentNode;
//     } while (clickedComponent);
//     return inside;
//   }
//
//   // editor = this.getParentFromElement(clickedComponent, (element)=>{
//   //   return element.classList.contains('ng-editor')
//   // });
//   getParentFromElement(element, filter){
//     let parent;
//     do {
//       if (element && filter(element)) {
//         parent = element;
//         break;
//       }
//       element = element.parentNode;
//     } while (element);
//
//     return parent;
//   }
// }
