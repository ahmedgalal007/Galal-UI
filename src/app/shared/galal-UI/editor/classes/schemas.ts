import {EnumToolbarButtonType} from "./enums";
/**
 * Created by ahmedgalal on 3/11/17.
 */

export class ToolbarButton{
  constructor(public name: string,
              public type: EnumToolbarButtonType = EnumToolbarButtonType.Button,
              public args: string[], public glyphicon: string = "", public cb:any){}
}


