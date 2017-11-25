import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _todos = [];

  @Input('data')
  set todos(value) {
    this._todos = value;
    this.isTooMore = this.todos.length > 5;
  }
  get todos() {
    return this._todos;
  }


  isTooMore = false;

  @Output() clearEvent = new EventEmitter();

  filterType = 'All';

  @Output() filterTypeEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  log() {
    console.log('log from footer');
  }

  changeFilterType(type) {
    this.filterType = type;
    this.filterTypeEvent.emit(type);
  }

}
