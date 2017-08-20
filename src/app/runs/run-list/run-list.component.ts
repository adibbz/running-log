import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService, RunService } from '../../services/index';
import { Subscription } from 'rxjs';

import { Run } from '../run.model';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html'
})
export class RunListComponent implements OnInit, OnDestroy {
  runs: FirebaseListObservable<any>;
  currentUserID: string;
  sub: Subscription;
  displayModal = false;
  run: Run;

  constructor(private db: AngularFireDatabase, private authService: AuthService, private runService: RunService) { }

  ngOnInit() {
    this.authService.getAuthState()
      .subscribe((user) => {
        if (user) {
          this.currentUserID = user.uid;
          this.getRuns(this.currentUserID);
        }
      })
  }

  getRuns(uid: string) {
    this.runs = this.db.list('/runs', {
      query: {
        orderByChild: 'userId',
        equalTo: uid
      }
    });
  }

  openAddRunModal() {
    this.displayModal = true;
  }

  addItem(form) {
    console.log(form);
    this.run = form;
    this.run.time = this.runService.formattedTime(form.time.hours, form.time.minutes, form.time.seconds);
    this.run.avgPace = this.runService.calculateAvgPace(form.distance, form.time.hours, form.time.minutes, form.time.seconds);
    this.run.userId = this.currentUserID;
    alert( this.runService.calculateAvgPace(5, 0, 40, 0))
    console.log(this.run, 'run')
    //this.runs.push({ date: newDate, distance: newDistance, time: time, avgPace: pace, userId: this.currentUserID });
  }

  deleteItem(key: string) {
    this.runs.remove(key);
  }


  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

}
