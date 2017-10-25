import {
  Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewChildren,
  QueryList, OnDestroy, EventEmitter
} from '@angular/core';
import {Http, Response} from '@angular/http';
// import {EditorToolbarComponent} from "./_trash/editor-toolbar.component";
import 'rxjs/Rx';



import {EditorHelper} from './Helpers/EditorHelper';
import {BarButtonComponent} from './toolbar/Buttons/bar-button.component';
import {ElementManager} from './Helpers/ElementManager';

import { Observable} from 'rxjs/observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  moduleId : module.id,
  selector: 'galal-ui-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  // richTextField : ElementRef
  @ViewChild('richTextField') richTextField: ElementRef;
  // @ViewChildren('toolbarVC') toolbarsVC:QueryList<EditorToolbarComponent> ;
  @ViewChildren('toolbarVC') toolbarsVC: QueryList<BarButtonComponent> ;
  configData: any;
  toolbars: any;
  DOM: Document;
  sel;
  ownerDocument: Document;
  selectedElement: HTMLElement;
  contextMenu: HTMLElement;
  editorHelper: EditorHelper;


  subscriptions: Subscription[] = [];
  public selectionChanged: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  logging = 'true';
  useCss = 'true';


  constructor(public elementRef: ElementRef, public http: Http) {
    this.editorHelper = new EditorHelper(this);
  }

  ngOnInit() {
    this.editorHelper.getJSON('assets/toolbars2.json').subscribe(
            data => {
        this.configData = data;
        this.toolbars = data.toolbars;
        this.DOM.dir = this.configData.rtl ? 'rtl' : 'ltr';
      },
      error => console.log(error)
    );
  }

  ngAfterViewInit() {
    this.enableDesignMode();
    this.toolbarsVC.changes.subscribe(() => this.loadToolbars());
  }


  loadToolbars() {
    this.editorHelper.unSubscribeToolbars();

    this.toolbarsVC.forEach((item) => {
      item.editor = this.elementRef;
      this.subscriptions.push(item.barBtnClicked.subscribe((data) => {
        this.DOM.body.focus();
        // calert("Command: '" + data.command + "' ,Value: " + data.value);
        if (data.command.toLowerCase() !== 'custom') {
          this.DOM.execCommand(data.command, false, data.value);
        }else {
          if (typeof data.callback === 'function') {
            data.callback.apply(this.DOM, data.callbackArgs);
            data.barButton.processResult(this);
          }
        }

      }));
    });
  }

  getHTML() {
    alert(this.DOM.body.innerHTML);
  }

  enableDesignMode() {
    this.DOM =  this.richTextField.nativeElement.contentDocument
      || this.richTextField.nativeElement.contentWindow.document;

    const cssLink = this.DOM.createElement('link');
    cssLink.href =  'assets/editor.dom.css';
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    this.DOM.getElementsByTagName('head')[0].appendChild(cssLink);
    // this.DOM.head.appendChild(cssLink);
    console.log(this.DOM.getElementsByTagName('head')[0]);


    this.DOM.designMode = 'On';

    // StyleWithCSS
    if (!this.DOM.execCommand('StyleWithCSS', false, this.useCss)) {
      // The value required by UseCSS is the inverse of what you'd expect
      this.DOM.execCommand('UseCSS', false, !this.useCss);
    }
    this.editorHelper.addListeners();
    // enableInlineTableEditing
    this.DOM.execCommand('enableObjectResizing', false, 'false');
    this.DOM.execCommand('enableInlineTableEditing', false, 'false');
  }

  setupSelectedElement() {

    // this.attributes['selectedElement'] = event.target as HTMLElement;

    switch (this.selectedElement.tagName) {
      case 'IMG': {
        alert('Image Clicked');
        break;
      }
      default: {
        alert(this.selectedElement.tagName);
      }
    }
    console.log(this.selectedElement);
  }

  log(msg: any, isAlert: boolean = false) {
      if (this.logging) {
        if (isAlert) {
          alert(msg);
        }
        console.log(msg);
      }
  }

  ngOnDestroy() {
    this.editorHelper.unSubscribeToolbars();
  }

}

function saveSelection() {
  if (window.getSelection) {
    this.sel = window.getSelection();
    if (this.sel.getRangeAt && this.sel.rangeCount) {
      const ranges = [];
      for (var i = 0, len = this.sel.rangeCount; i < len; ++i) {
        ranges.push(this.sel.getRangeAt(i));
      }
      return ranges;
    }
  } else if (this.DOM.selection && this.DOM.selection.createRange) {
    return this.DOM.selection.createRange();
  }
  return null;
}

function restoreSelection(savedSel) {
  if (savedSel) {
    if (window.getSelection) {
      this.sel = window.getSelection();
      this.sel.removeAllRanges();
      for (let i = 0, len = savedSel.length; i < len; ++i) {
        this.sel.addRange(savedSel[i]);
      }
    } else if (this.DOM.selection && savedSel.select) {
      savedSel.select();
    }
  }
}


//   function submit_form(){
//   var theForm = document.getElementById("myform");
//   theForm.elements["myTextArea"].value = window.frames['richTextField'].document.body.innerHTML;
//   theForm.submit();
// }

//  loadToolbars(){
//     this.toolbarsVC.forEach((item) => {
//       this.log('Subscribe to toolbar-' + item.toolbarConfig.name);
//       item.editor = this.elementRef;
//       this.subscriptions.push(item.toolBarBtnClicked.subscribe((toolBtn) => {
//         this.log(toolBtn.name + '-Toolbar : Executed');
//         this.DOM.body.focus();
//         this.DOM.execCommand(toolBtn.name,false,toolBtn.args.value? toolBtn.args.value: null);
//       }));
//     })
//  }
