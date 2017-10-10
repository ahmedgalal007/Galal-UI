/**
 * Created by ahmedgalal on 3/11/17.
 */

import {Http, Response, Headers} from "@angular/http";
import  'rxjs/Rx';
import {Observable} from "rxjs";
import {EditorComponent} from "../editor.component";
import {ElementManager} from "./ElementManager";
//import * as fs from "fs"

export class EditorHelper {
  elementManager:ElementManager;

  constructor(public editor: EditorComponent){
    this.elementManager = new ElementManager(editor);
  }

  public addListeners(){
    let that = this.editor;
    that.contextMenu = that.ownerDocument.getElementsByClassName("context-menu")[0] as HTMLElement;

    this.editor.DOM.addEventListener("click",function (event) {
      _changeSelection(event);
      that.selectionChanged.emit(that.selectedElement);
      that.richTextField.nativeElement.ownerDocument.body.click();
    });

    this.editor.DOM.addEventListener("selectionchange",function (event) {
      that.log("selection-change",false);
    });

    this.editor.DOM.addEventListener("selectstart",function (event) {
      that.log("selection-start",false);
    });

    this.editor.DOM.addEventListener("select",function (event) {
      that.log("selection-end ",false);
    });

    this.editor.DOM.addEventListener('contextmenu', function(ev) {
      ev.preventDefault();

      _changeSelection(ev);
      //that.richTextField.nativeElement.ownerDocument.body.click();
      _createContext(ev);

      that.selectionChanged.emit(that.selectedElement);
      return false;
    }, false);

    let _changeSelection = (ev) => {
      that.selectedElement = ev.target as HTMLElement;
      that.log(that.selectedElement.tagName,false);
    }

    let _createContext = (ev) => {


      if(that.ownerDocument.getElementsByClassName("context-menu").length == 0 ){
        that.contextMenu;
        that.contextMenu = that.ownerDocument.createElement("nav");
        that.contextMenu.setAttribute("class", that.contextMenu.getAttribute("class")? that.contextMenu.getAttribute("class") + " context-menu": "context-menu");
        that.contextMenu.setAttribute("contenteditable", "false");
        that.DOM.body.appendChild(that.contextMenu);
      }
      that.contextMenu.style.left = ev.x - (that.contextMenu.offsetWidth * 0.9) + 'px';
      that.contextMenu.style.top = (ev.y -10)+ 'px';
    }
  }

  public queryCommandValue (command: string) {
    return this.editor.DOM.queryCommandValue (command);
  }

  public getJSON(uri: string): Observable<any> {
    //let headers = new Headers();
    //headers.append('Accept', 'q=0.8;application/json;q=0.9');
    return this.editor.http.get(uri)
      .map((res:any) => {return res.json()}) //.json()
      .catch(this.handleError);
  }

  public handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public unSubscribeToolbars(){
    for(let subscription of this.editor.subscriptions){
      subscription.unsubscribe();
    }
    this.editor.log(this.editor.subscriptions);
  }

  public getDirList(){
    //fs.readdir('/app/src/dir')
  }
}
