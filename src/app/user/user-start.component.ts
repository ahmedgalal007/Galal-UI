import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-start',
  template: `
    <h1>
      Please <span style="color:red;">search for</span> a user.
    </h1>
  `,
  styles: []
})
export class UserStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
