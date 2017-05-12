import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../auth.service';
import { Run } from '../run.model';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html'
})
export class RunListComponent implements OnInit {
  runs: FirebaseListObservable<any>;
  currentUserID: string;
  runModel: Run;

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuthenticated()
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

  addItem(newDate: string, newDistance: string, newTime: string) {
    this.runs.push({ date: newDate, distance: newDistance, time: newTime, userId: this.currentUserID });
  }

  deleteItem(key: string) {
    this.runs.remove(key);
  }

}
