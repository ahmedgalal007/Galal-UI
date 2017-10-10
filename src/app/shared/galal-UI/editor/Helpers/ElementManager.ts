/**
 * Created by ahmedgalal on 10/6/17.
 */

import {EditorComponent} from "../editor.component";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {TDContext} from "./context/TDContext";
import {TRContext} from "./context/TRContext";
import {IMGContext} from "./context/IMGContext";

export class ElementManager {

  protected static tdContext:TDContext;
  protected static trContext:TRContext;
  protected static imgContext:IMGContext;

  constructor(public editor: EditorComponent){
    ElementManager.tdContext = new TDContext(editor);
    ElementManager.trContext = new TRContext(editor);
    ElementManager.imgContext = new IMGContext(editor);

    editor.selectionChanged.subscribe((el)=>{
      switch (el.tagName.toLowerCase()){
        case 'td': {
          ElementManager.tdContext.buildContext(el);
          break;
        }
        case 'tr': {
          //alert('tr');
          break;
        }
        case 'img': {
          //alert('img');
          break;
        }
        case '': {
          //alert('text');
          break;
        }
        default: {
          //statements;
          break;
        }
      }


    }, this);
  }
}
