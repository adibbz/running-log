import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../auth.service';
import { Run } from '../run.model';
import { RunService } from '../run.service';
import { ConfirmComponent } from '../../shared/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html'
})
export class RunListComponent implements OnInit, OnDestroy {
  runs: FirebaseListObservable<any>;
  currentUserID: string;
  runModel: Run;
  sub: Subscription;

  constructor(private db: AngularFireDatabase, private authService: AuthService, private runService: RunService, private dialogService: DialogService) { }

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

  addItem(newDate: string, newDistance: number, hours: number, minutes: number, seconds: number) {
    const time = this.runService.formattedTime(hours, minutes, seconds);
    const pace = this.runService.calculateAvgPace(newDistance, hours, minutes, seconds);
    this.runs.push({ date: newDate, distance: newDistance, time: time, avgPace: pace, userId: this.currentUserID });
  }

  deleteItem(key: string) {
    this.runs.remove(key);
  }

  showConfirm() {
    this.sub = this.dialogService.addDialog(ConfirmComponent, {
      title: 'Add a run',
      message: 'Confirm message'
    })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          alert('accepted');
        }
        else {
          alert('declined');
        }
      });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    // setTimeout(() => {
    //   disposable.unsubscribe();
    // }, 10000);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
