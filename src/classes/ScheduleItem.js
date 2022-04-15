export default class ScheduleItem {
  constructor(item) {
    if (!item) {
      this.circuit = {
        location: {
          country: "",
          lat: 0,
          long: 0,
          locality: "",
        },
        circuitId: "",
        circuitName: "",
        details: {
          circuitId: "",
          firstGp: 0,
          gjsonMap: "",
          circuitLength: 0,
          numberOfLaps: 0,
          raceDistance: 0,
          primaryColor: "",
          secondaryColor: "",
          tertiaryColor: "",
        },
        url: "",
      };
      this.date = "";
      this.time = "";
      this.raceName = "";
      this.round = 0;
      this.season = 0;
      this.url = "";
      this.firstPractice = {
        date: "",
        time: "",
      };
      this.secondPractice = {
        date: "",
        time: "",
      };
      this.thirdPractice = {
        date: "",
        time: "",
      };
      this.qualifying = {
        date: "",
        time: "",
      };

      return;
    }

    this.circuit = {
      location: {
        country: item.Circuit.Location.country,
        lat: parseFloat(item.Circuit.Location.lat),
        long: parseFloat(item.Circuit.Location.long),
        locality: item.Circuit.Location.locality,
      },
      circuitId: item.Circuit.circuitId,
      circuitName: item.Circuit.circuitName,
      details: null,
      url: item.Circuit.url,
    };

    if (item.Circuit.details) {
      this.circuit.details = {
        circuitId: item.Circuit.details.circuit_id,
        firstGp: item.Circuit.details.first_gp,
        gjsonMap: item.Circuit.details.gjson_map,
        circuitLength: item.Circuit.details.length,
        numberOfLaps: item.Circuit.details.number_of_laps,
        raceDistance: item.Circuit.details.race_distance,
        primaryColor: item.Circuit.details.primary_color,
        secondaryColor: item.Circuit.details.secondary,
        tertiaryColor: item.Circuit.details.tertiary,
      };
    }

    this.date = item.date;
    this.time = item.time;
    this.raceName = item.raceName;
    this.round = parseInt(item.round);
    this.season = parseInt(item.season);
    this.url = item.url;
    this.firstPractice = item.FirstPractice;
    this.secondPractice = item.SecondPractice;
    this.qualifying = item.Qualifying;

    if (item.ThirdPractice) {
      this.thirdPractice = item.ThirdPractice;
    }

    if (item.Sprint) {
      this.sprint = item.Sprint;
    }
  }

  getFirstPracticeDate() {
    if (!this.firstPractice) {
      return null;
    }

    return new Date(`${this.firstPractice.date}T${this.firstPractice.time}`);
  }

  getSecondPracticeDate() {
    if (!this.secondPractice) {
      return null;
    }

    return new Date(`${this.secondPractice.date}T${this.secondPractice.time}`);
  }

  getThirdPracticeDate() {
    if (!this.thirdPractice) {
      return null;
    }

    return new Date(`${this.thirdPractice.date}T${this.thirdPractice.time}`);
  }

  getSprintDate() {
    if (!this.sprint) {
      return null;
    }

    return new Date(`${this.sprint.date}T${this.sprint.time}`);
  }

  getQualifyingDate() {
    if (!this.qualifying) {
      return null;
    }

    return new Date(`${this.qualifying.date}T${this.qualifying.time}`);
  }

  getRaceDate() {
    if (!this.qualifying) {
      return null;
    }

    return new Date(`${this.date}T${this.time}`);
  }
}
