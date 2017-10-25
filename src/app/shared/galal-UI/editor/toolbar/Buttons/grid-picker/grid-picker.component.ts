import {Component, Output, EventEmitter, Input, ViewChild, ElementRef} from '@angular/core';
import {iButton} from '../iButton';
// import {forEach} from '@angular/router/src/utils/collection';
// import {by} from 'protractor';

@Component({
  selector: 'li[grid-picker]',
  templateUrl: './grid-picker.component.html',
  styleUrls: ['./grid-picker.component.css']
})
export class GridPickerComponent extends iButton {

  @ViewChild('matrix') matrix: ElementRef;

  rows: number[] = [1, 2, 3, 4];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7];
  min = {'Rows': 4, 'Cols': 7};
  max = {'Rows': 12, 'Cols': 12};

  onClick(val){
    this.data.barButton = this;
    this.data.value = val;
    this.data.callbackArgs = [val.Row, val.Col];
    if (typeof this.data.callback !== 'function') {
      eval('this.data.callback = ' + this.data.callback);
    }
    console.log(this.data.callback);
    this.btnClicked.emit(this.data);
  }

  processResult(Editor){
    // console.log(Editor);
    const table = document.createElement('table');
    for (let i = 0 ; i < this.data.value.Row; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < this.data.value.Col; j++) {
        const td = document.createElement('td');
        td.setAttribute('role', 'tableCell');
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    // this.rows.forEach((row)=>{
    //   this.cols.forEach((col)=>{});
    // });
    Editor.DOM.execCommand('insertHTML', null, table.outerHTML);
    Editor.log(table.outerHTML, true);
  }
  // onLoad(cell:HTMLElement, data){
    // let rowAttr = document.createAttribute("row");
    // rowAttr.value = data.Row;
    // cell.attributes.setNamedItem(rowAttr);
  // }

  onMouseOver(data){
    let anchrs:HTMLElement[] = this.matrix.nativeElement.getElementsByTagName("a");



    if(data.Row < this.rows.length) {
      if(data.Row < this.min.Rows){
        this.rows = this.rows.slice(0,this.min.Rows);
      }else{
        this.rows = this.rows.slice(0,data.Row);
      }

    }
    if(data.Col < this.cols.length){
      if(data.Col < this.min.Cols){
        this.cols = this.cols.slice(0,this.min.Cols);
      }else{
        this.cols = this.cols.slice(0,data.Col);
      }

    }

    if(data.Row == this.rows.length) {
      if(data.Row < this.max.Rows) {
        this.rows.push(this.rows.length + 1);
        //console.log(this.rows);
      }
    }

    if(data.Col  == this.cols.length){
      if(data.Col < this.max.Cols){
        this.cols.push(this.cols.length+1);
        //console.log(this.cols);
      }
    }

    for(let lnk of anchrs){

      if(lnk.classList.contains('highlighted')){
        lnk.classList.remove('highlighted');
      }

      if(lnk.getAttribute('data-row') < data.Row){
        if(lnk.getAttribute('data-col') < data.Col){
          lnk.classList.add('highlighted');
        }
      }

    }
  }

}
