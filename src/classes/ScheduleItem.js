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
  }
}
