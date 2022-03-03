export default class Timing {
  constructor(item) {
    if (!item) {
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.milliseconds = 0;

      return;
    }

    this.hours = item.hrs;
    this.minutes = item.mins;
    this.seconds = item.secs;
    this.milliseconds = item.ms;
  }

  toStringFormatted(padNumbers = false) {
    const times = [];

    let milliseconds = this.milliseconds;

    if (padNumbers) {
      if (milliseconds < 10) {
        milliseconds *= 100;
      } else if (milliseconds < 100) {
        milliseconds *= 10;
      }
    }

    if (this.hours > 0) {
      times.push(this.hours);
      times.push(this.minutes);
      times.push(this.seconds);
      times.push(milliseconds);
    } else if (this.minutes > 0) {
      times.push(this.minutes);
      times.push(this.seconds);
      times.push(milliseconds);
    } else {
      times.push(this.seconds);
      times.push(milliseconds);
    }

    if (padNumbers) {
      for (let i = 0; i < times.length; i++) {
        times[i] = this.pad(times[i]);
      }
    }

    const timeString = times.join(":");
    const lastIndex = timeString.lastIndexOf(":");

    return (
      timeString.substring(0, lastIndex) +
      "." +
      timeString.substring(lastIndex + 1)
    );
  }

  pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }
}

Timing.prototype.toString = function () {
  return `${this.hours}:${this.minutes}:${this.seconds}.${this.milliseconds}`;
};
