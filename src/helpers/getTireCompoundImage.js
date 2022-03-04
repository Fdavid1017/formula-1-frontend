export default function (compound) {
  switch (compound) {
    case "SOFT":
      return require(`@/assets/images/tires/soft.svg`);
    case "MEDIUM":
      return require(`@/assets/images/tires/medium.svg`);
    case "HARD":
      return require(`@/assets/images/tires/hard.svg`);
    case "INTERMEDIATE":
      return require(`@/assets/images/tires/inter.svg`);
    case "WET":
      return require(`@/assets/images/tires/rain.svg`);
    default:
      return null;
  }
}
