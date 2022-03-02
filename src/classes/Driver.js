import Constructor from "@/classes/Constructor";

export default class Driver {
  constructor(item) {
    if (item === undefined) {
      this.team = new Constructor();
      this.driver = {
        code: "",
        dateOfBirth: new Date(),
        driverId: "",
        familyName: "",
        givenName: "",
        nationality: "",
        permanentNumber: 0,
        url: "",
      };
      this.points = 0;
      this.position = 0;
      this.positionText = "";
      this.wins = 0;

      return;
    }

    this.team = new Constructor(item.Constructors);
    this.driver = {
      code: item.Driver.code,
      dateOfBirth: new Date(item.Driver.dateOfBirth),
      driverId: item.Driver.driverId,
      familyName: item.Driver.familyName,
      givenName: item.Driver.givenName,
      nationality: item.Driver.nationality,
      permanentNumber: parseInt(item.Driver.permanentNumber),
      url: item.Driver.url,
    };
    this.points = parseFloat(item.points);
    this.position = parseInt(item.position);
    this.positionText = item.positionText;
    this.wins = parseInt(item.wins);
  }
}
