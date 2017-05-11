import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.css']
})
export class RunListComponent implements OnInit {
  runs: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
    this.runs = db.list('/runs');
  }

  addItem(newDate: string, newDistance: string, newTime: string) {
    this.runs.push({ date: newDate, distance: newDistance, time: newTime });
  }

  deleteItem(key: string) {
    this.runs.remove(key);
  }

  ngOnInit() {
  }

}
