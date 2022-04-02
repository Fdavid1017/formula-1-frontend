import axios from "axios";
import ScheduleItem from "@/classes/ScheduleItem";

export async function getCurrentSchedule() {
  let data = null;
  await axios({
    url: `current-schedule`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  const schedule = [];

  data.forEach((item) => {
    schedule.push(new ScheduleItem(item));
  });

  return schedule;
}

export async function getScheduledRoundInformation(round) {
  let data = null;
  await axios({
    url: `schedule/${round}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return new ScheduleItem(data);
}

export async function getUpcomingRace() {
  let data = null;
  await axios({
    url: `upcoming-race`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return new ScheduleItem(data);
}
