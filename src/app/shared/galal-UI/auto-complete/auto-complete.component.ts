import {
  Component, ElementRef, Input, OnInit,
  trigger, state, transition, animate, style
} from '@angular/core';

@Component({
  selector: 'galal-ui-autocomplete',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  styleUrls:[ 'auto-complete.component.css'],
  templateUrl: 'auto-complete.component.html',
  animations:[
    trigger('itemLabel',[
      state('active',style({
        color:'red',
        transform: 'scale(0.8)',
        position: 'static',
        padding: '0px'
      })),
      state('inactive',style({
        color:'green',
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
export class AutoCompleteComponent implements OnInit{
  state: string = 'active';
  @Input() multiSelect: boolean = false;
  public selected = [];
  public query = '';
  public countries = [ "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
    "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
    "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
    "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
    "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
    "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
    "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
    "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
  public filteredList = [];
  public elementRef;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  ngOnInit(){
    //this.elementRef.nativeElement.innerHTML = this.generateTemplate();
  }

  filter() {
    if (this.query !== ""){
      this.filteredList = this.countries.filter(function(el){
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    }else{
      this.filteredList = [];
    }
  }

  select(item){
    if(this.multiSelect){
      this.selected.push(item);
      this.query = '';
      this.filteredList = [];
    }else{
      this.query = item;
      this.filteredList = [];
    }
  }

  remove(item){
    this.selected.splice(this.selected.indexOf(item),1);
  }

  toggleAnimation(){
    //this.state = (this.state === 'inactive')? 'active' : 'inactive';
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
        break;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.filteredList = [];
    }
  }

}
