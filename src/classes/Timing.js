export default class Timing {
  constructor(item) {
    if (!item) {
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.milliseconds = 0;
    }

    this.hours = item.hrs;
    this.minutes = item.mins;
    this.seconds = item.secs;
    this.milliseconds = item.ms;
  }
}
