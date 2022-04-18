export default class TyreStrategyItem {
  constructor(item) {
    if (item) {
      this.compound = item.compound;
      this.stintNumber = item.stint;
      this.stintLength = item.stintLength;
      this.stintStart = item.stintStart;
      return;
    }

    this.compound = "";
    this.stintNumber = 0;
    this.stintLength = 0;
    this.stintStart = 0;
  }
}
