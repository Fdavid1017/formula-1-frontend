import TyreStrategyItem from "./TyreStrategyItem";

export default class TyreStrategy {
  constructor(item) {
    if (item) {
      this.driver = item.driver;
      this.strategies = item.strategies;
      return;
    }

    this.driver = "";
    this.strategies = Array < TyreStrategyItem > [];
  }

  calculateStintsLength() {
    let previousStintEnd = 0;
    this.strategies.forEach((strategy) => {
      strategy.stintStart = previousStintEnd;
      previousStintEnd += strategy.stintLength;
    });
  }
}
