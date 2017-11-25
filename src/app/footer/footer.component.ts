import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {

  @Input('data') todos = [];
  isTooMore = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log('todos has changed!!!!');
    this.isTooMore = this.todos.length > 5;
  }

}
