import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.css']
})
export class RunListComponent implements OnInit {
  items: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.items = af.database.list('/runs');
  }

  addItem(newDate: string, newDistance: string, newTime: string) {
    this.items.push({ date: newDate, distance: newDistance, time: newTime });
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  ngOnInit() {
  }

}
