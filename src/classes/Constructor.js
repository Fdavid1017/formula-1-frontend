export default class Constructor {
  constructor(item) {
    if (item === undefined) {
      this.team = {
        constructorId: "",
        name: "",
        nationality: "",
        url: "",
      };
      this.color = {
        primary: "",
        secondary: "",
        tertiary: "",
      };
      this.nameExtended = {
        fullName: "",
        shortName: "",
      };
      this.points = 0;
      this.position = 0;
      this.positionText = "";
      this.wins = 0;
      this.drivers = [];

      return;
    }

    this.team = {
      constructorId: item.Constructor.constructorId,
      name: item.Constructor.name,
      nationality: item.Constructor.nationality,
      url: item.Constructor.url,
    };
    this.color = {
      primary: item.color.primary,
      secondary: item.color.secondary,
      tertiary: item.color.tertiary,
    };
    this.nameExtended = {
      fullName: item.nameExtended.fullName,
      shortName: item.nameExtended.shortName,
    };
    this.points = parseFloat(item.points);
    this.position = parseInt(item.position);
    this.positionText = item.positionText;
    this.wins = parseInt(item.wins);
    this.drivers = [];

    if (item.drivers) {
      item.drivers.forEach((driver) => {
        this.drivers.push({
          code: driver.code,
          id: driver.id,
        });
      });
    }
  }
}
