import { sessionNames } from "../helpers/sessionNames";
import axios from "axios";
import store from "@/store";
import TyreStrategyItem from "../classes/TyreStrategyItem";
import TyreStrategy from "../classes/TyreStrategy";

export async function getTyreStrategies(gp, session) {
  session = session.toUpperCase();
  if (!sessionNames.includes(session)) {
    throw Error("Invalid session name");
  }

  let data = null;
  await axios({
    url: `tyre-usage/${gp}/${session}/${store.getters.currentSeasonYear}`,
    method: "GET",
  })
    .then((response) => {
      if (response.data) {
        data = JSON.parse(response.data);
      }
    })
    .catch((error) => {
      switch (error.response.status) {
        case 404:
          data = [];
          break;
      }
    });

  const driverKeys = Object.keys(data.Driver);

  const driverStrategies = {};
  for (let i = 0; i < driverKeys.length; i++) {
    const driver = data.Driver[driverKeys[i]];
    const strategyItem = new TyreStrategyItem({
      compound: data.Compound[i],
      stint: data.Stint[i],
      stintLength: data.StintLength[i],
      stintStart: null,
    });

    if (driverStrategies[driver]) {
      driverStrategies[driver].strategies.push(strategyItem);
    } else {
      const strategy = {
        driver: driver,
        strategies: [strategyItem],
      };
      driverStrategies[driver] = new TyreStrategy(strategy);
    }
  }

  Object.keys(driverStrategies).forEach((key) => {
    driverStrategies[key].calculateStintsLength();
  });

  return Object.values(driverStrategies);
}
