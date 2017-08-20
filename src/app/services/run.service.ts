import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class RunService {

  formattedTime(hours, minutes, seconds) {
    return moment.duration({
      seconds: seconds,
      minutes: minutes,
      hours: hours}).format("h:mm:ss");
  }

  calculateAvgPace(distance, hours, minutes, seconds) {
    //Hours to seconds
    var hrs = 0;
    if(hours) {
      hrs = hours * Math.pow(60, 2);
    }
    //Minutes to seconds
    var mins = 0;
    if(minutes) {
      mins = minutes * 60;
    }
    var secs = 0;
    if(seconds) {
      secs = seconds * 1;
    }
    const totalSeconds = hrs + mins + secs;
    const paceInSeconds = Math.round(totalSeconds / distance);
    const paceInMinutes = paceInSeconds / 60;
    return moment.duration(paceInMinutes, "minutes").format("h:mm:ss");
  }

}
