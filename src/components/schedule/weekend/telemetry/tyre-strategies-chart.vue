<template>
  <div class="fill-height">
    <apexchart
      type="rangeBar"
      height="800"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { getTyreStrategies } from "../../../../services/tyre-strategies-service";
import { TyreCompoundEnum } from "../../../../enums/TyreCompoundEnum";

export default {
  name: "tyre-strategies-chart",
  props: {
    round: {
      type: String,
      default: "",
    },
    session: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    series: [],
    chartOptions: {
      chart: {
        height: 350,
        type: "rangeBar",
        zoom: {
          enabled: false,
        },
      },
      colors: ["#FF3333", "#FFF200", "#EBEBEB", "#39B54A", "#00AEEF"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "60%",
          rangeBarGroupRows: true,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 3,
        dashArray: 0,
      },
      title: {
        text: "Tyre Strategies",
        align: "center",
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, obj) {
          return obj.w.config.series[obj.seriesIndex].name;
        },
        style: {
          colors: [
            function ({ seriesIndex }) {
              const darkerIndexes = [1, 2];
              if (darkerIndexes.includes(seriesIndex)) {
                return "#000";
              } else {
                return "#fff";
              }
            },
          ],
        },
      },
      xaxis: {
        title: {
          text: "Lap",
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function () {
            return `Laps:`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  }),
  mounted() {
    getTyreStrategies(this.round, this.session).then((response) => {
      const soft = {
        name: "SOFT",
        data: [],
      };
      const medium = {
        name: "MEDIUM",
        data: [],
      };
      const hard = {
        name: "HARD",
        data: [],
      };
      const inter = {
        name: "INTER",
        data: [],
      };
      const wet = {
        name: "WET",
        data: [],
      };

      response.forEach((strategy) => {
        strategy.strategies.forEach((strategyItem) => {
          const data = {
            x: strategy.driver,
            y: [
              strategyItem.stintStart,
              strategyItem.stintStart + strategyItem.stintLength,
            ],
          };

          switch (strategyItem.compound) {
            case TyreCompoundEnum.SOFT:
              soft.data.push(data);
              break;
            case TyreCompoundEnum.MEDIUM:
              medium.data.push(data);
              break;
            case TyreCompoundEnum.HARD:
              hard.data.push(data);
              break;
            case TyreCompoundEnum.INTERMEDIATE:
              inter.data.push(data);
              break;
            case TyreCompoundEnum.WET:
              wet.data.push(data);
              break;
          }
        });
      });

      this.series = [soft, medium, hard, inter, wet];
    });
  },
};
</script>

<style scoped></style>
