import {EditorComponent} from "../../editor.component";
/**
 * Created by ahmedgalal on 10/7/17.
 */

export class TDContext{
  constructor(public editor: EditorComponent){

  }

  commands = [
    {name: "addcol", lable:"Add Column", classes:"table-cmd glyphicon glyphicon-plus"},
    {name: "delcol", lable:"Delete Column", classes:"table-cmd glyphicon glyphicon-minus"}
  ];

  buildContext(el:HTMLElement){
    let UL = this.editor.DOM.createElement('ul');
    this.commands.forEach((item)=>{
      let elem = this.editor.DOM.createElement('li');
      elem.setAttribute("name", item.name);
      elem.setAttribute("class", item.classes);
      elem.innerText = item.lable;
      UL.appendChild(elem);
    })
    this.editor.contextMenu.innerHTML = "";
    this.editor.contextMenu.appendChild(UL);
  }
}
