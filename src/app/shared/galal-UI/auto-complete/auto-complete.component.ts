import {
  Component, ElementRef, Input, OnInit,
  trigger, state, transition, animate, style, AfterViewInit, HostListener
} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'galal-ui-autocomplete',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  styleUrls: [ 'auto-complete.component.css'],
  templateUrl: 'auto-complete.component.html',
  animations: [
    trigger('itemLabel', [
      state('active', style({
        color: 'red',
        transform: 'scale(0.8)',
        position: 'static',
        padding: '0px'
      })),
      state('inactive', style({
        color: 'green',
        transform: 'scale(1)',
        position: 'absolute',
        padding: '5px'
      })),

      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out')),

      ]
    )
  ]
})
export class AutoCompleteComponent implements OnInit, AfterViewInit {
  state = 'active';
  @Input() multiSelect = false;
  @Input() searchURL = '';
  @Input() blurFn? ;
  @Input() name? ;
  public selected = [];
  public query = '';
  public items;

  public JSON = JSON;
  public filteredList = [];
  public elementRef;

  constructor(myElement: ElementRef, private http: Http) {
    this.elementRef = myElement;
  }

  ngOnInit() {}
  getData(): Observable<any> { return this.http.get(this.searchURL)
    .map(res => {
      const result = res.json();
      console.log(result);
      return result; });
  }
  ngAfterViewInit() {
    // this.elementRef.nativeElement.innerHTML = this.generateTemplate();
     this.getData().subscribe(res => this.items = res);
  }

  filter() {
    if (this.query !== '') {
      this.filteredList = this.items.filter(function(el){
        return el.text.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    } else {
      this.filteredList = [];
    }
  }

  select(item) {
    if (this.multiSelect) {
      this.selected.push(item);
      this.query = '';
      this.filteredList = [];
    }else {
      this.query = item.text;
      this.selected = [item];
      this.filteredList = [];
    }
    this.elementRef.nativeElement.value = this.selected ;
    if ( typeof (this.blurFn) === 'function') {
      this.blurFn(this.elementRef.nativeElement);
    }
  }

  remove(item) {
    this.selected.splice(this.selected.indexOf(item), 1);
    this.elementRef.nativeElement.value = JSON.stringify(this.selected) ;
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
        break;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }

}
