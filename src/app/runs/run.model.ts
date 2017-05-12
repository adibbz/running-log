export class Run {
  public date: string;
  public distance: string;
  public time: string;
  public userId: string;

  constructor(date: string, distance: string, time: string, userId) {
    this.date = date;
    this.distance = distance;
    this.time = time;
    this.userId = userId;
  }
}
