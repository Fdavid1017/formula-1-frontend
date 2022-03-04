import Driver from "@/classes/Driver";
import Timing from "@/classes/Timing";
import msToTime from "@/helpers/msToTime";

export default class RaceResult {
  constructor(item) {
    if (!item) {
      this.driver = new Driver();
      this.fastestLap = {
        averageSpeed: 0,
        time: new Timing(),
        lap: 0,
        rank: 0,
      };
      this.time = new Timing();
      this.timeMillis = 0;
      this.grid = 0;
      this.laps = 0;
      this.points = 0;
      this.position = 0;
      this.status = "";

      return;
    }

    this.driver = new Driver(item.Driver);

    if (item.FastestLap) {
      this.fastestLap = {
        averageSpeed: parseFloat(item.FastestLap.AverageSpeed.speed),
        time: timeToTiming(item.FastestLap.Time.time),
        lap: parseInt(item.FastestLap.lap),
        rank: parseInt(item.FastestLap.rank),
      };
    } else {
      this.fastestLap = {
        averageSpeed: 0,
        time: new Timing(),
        lap: 0,
        rank: 0,
      };
    }

    this.time = item.Time ? msToTime(item.Time.millis) : null;
    this.timeMillis = item.Time ? item.Time.millis : 0;
    this.grid = parseInt(item.grid);
    this.laps = parseInt(item.laps);
    this.points = parseInt(item.points);
    this.position = parseInt(item.position);
    this.status = item.status;
  }
}

function timeToTiming(time) {
  // 1:34.015
  const millis = parseInt(time.substring(time.length - 3));
  const secs = parseInt(time.substring(time.length - 6, time.length - 4));
  const minutes = parseInt(time.substring(time.length - 8, time.length - 6));

  const item = {
    hours: 0,
    mins: minutes,
    secs: secs,
    ms: millis,
  };
  return new Timing(item);
}
