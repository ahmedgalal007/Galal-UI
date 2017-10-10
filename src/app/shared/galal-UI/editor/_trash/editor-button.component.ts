// import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
// import {ToolbarButton} from "../classes/schemas";
// import {EnumToolbarButtonType} from "../classes/enums";
//
// @Component({
//   selector: 'galal-ui-editor-button',
//   template: `
//       <a class="btn btn-default btn-sm" roll="button" (click)="onClick()" ><span class="{{glyphicon}}" [style.background-color]="styleCSS"></span>{{args["label"]}}</a>
//   `,
//   styles: []
// })
// export class EditorButtonComponent implements OnInit {
//
//   @Output() btnClicked = new EventEmitter<ToolbarButton>();
//   btn: ToolbarButton;
//
//   @Input() name:string='';
//   @Input() type:EnumToolbarButtonType = EnumToolbarButtonType.Button;
//   @Input() args:string[]=[];
//   @Input() glyphicon:string='';
//   @Input() styleCSS:string='';
//   constructor() {
//   }
//
//   ngOnInit() {
//
//   }
//
//   onClick(){
//     this.btnClicked.emit(this.btn)
//   }
//
// }
//
//
