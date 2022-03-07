<template>
  <loading-indicator v-if="isLoading" />
  <div v-else class="mt-10 relative" style="z-index: 0">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-slider
          :max="maxLap"
          track-color="gray"
          color="primary"
          hide-details
          :label="`Lap ${lap}`"
          min="1"
          v-model="lap"
          thumb-label
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <apexchart
          ref="speedChart"
          :options="speedChartOptions"
          :series="speedSeries"
          height="400"
          type="line"
          width="100%"
        />
        <apexchart
          ref="throttleChart"
          :options="throttleChartOptions"
          :series="throttleSeries"
          height="200"
          type="line"
          width="100%"
        />
        <apexchart
          ref="brakeChart"
          :options="brakeChartOptions"
          :series="brakeSeries"
          height="200"
          type="line"
          width="100%"
        />
        <apexchart
          ref="rpmChart"
          :options="rpmChartOptions"
          :series="rpmSeries"
          height="400"
          type="line"
          width="100%"
        />
        <apexchart
          ref="gearChart"
          :options="gearChartOptions"
          :series="gearSeries"
          height="300"
          type="line"
          width="100%"
        />
        <apexchart
          ref="drsChart"
          :options="drsChartOptions"
          :series="drsSeries"
          height="200"
          type="line"
          width="100%"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoadingIndicator from "@/components/loading-indicator";
import SessionResult from "@/classes/SessionResult";
import { sessionLapDetailedTelemetryService } from "@/services/session-lap-detailed-telemetry-service";
import { largestLapNumberService } from "@/services/largest-lap-number-service";

export default {
  name: "lap-telemetry-chart",
  components: { LoadingIndicator },
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
    isLoading: false,
    results: Array[SessionResult],
    speedChartOptions: {
      chart: {
        id: "speed-chart",
        group: "telemetry",
      },
    },
    throttleChartOptions: {
      chart: {
        id: "throttle-chart",
        group: "telemetry",
      },
    },
    brakeChartOptions: {
      chart: {
        id: "brake-chart",
        group: "telemetry",
      },
    },
    rpmChartOptions: {
      chart: {
        id: "rpm-chart",
        group: "telemetry",
      },
    },
    gearChartOptions: {
      chart: {
        id: "gear-chart",
        group: "telemetry",
      },
    },
    drsChartOptions: {
      chart: {
        id: "drs-chart",
        group: "telemetry",
      },
    },
    speedSeries: [],
    throttleSeries: [],
    brakeSeries: [],
    rpmSeries: [],
    gearSeries: [],
    drsSeries: [],
    lap: 1,
    maxLap: 1,
    lapLoadingDebounce: null,
  }),
  async mounted() {
    this.isLoading = true;

    await largestLapNumberService(this.round, this.session).then((response) => {
      this.maxLap = response.largestLapNumber;
    });

    this.loadLapData();
  },
  methods: {
    setSeries() {
      const startTime = performance.now();
      const speedSeries = [];
      const throttleSeries = [];
      const brakeSeries = [];
      const rpmSeries = [];
      const gearSeries = [];
      const drsSeries = [];
      const categories = [];
      const colors = [];
      let maxLength = 0;

      const resultKeys = Object.keys(this.results);

      resultKeys.sort((a, b) => {
        const aValues = this.results[a];
        const bValues = this.results[b];

        if (!aValues || aValues.length === 0) {
          return 1;
        }

        if (!bValues || bValues.length === 0) {
          return -1;
        }

        const aTeam = aValues.team;
        const bTeam = bValues.team;

        if (aTeam === bTeam) {
          const aName = aValues.fullName;
          const bName = bValues.fullName;

          return aName > bName ? 1 : -1;
        }

        return aTeam > bTeam ? 1 : -1;
      });

      resultKeys.forEach((key) => {
        let speedSeriesValues = [];
        let throttleSeriesValues = [];
        let brakeSeriesValues = [];
        let rpmSeriesValues = [];
        let gearSeriesValues = [];
        let drsSeriesValues = [];
        let color;
        let driverName;
        // let i = 1;

        const item = this.results[key];

        // this.results[key].forEach((item) => {
        const nth = 3;
        speedSeriesValues = Object.values(item.carData.speed).filter(
          (e, i) => i % nth === nth - 1
        );
        throttleSeriesValues = Object.values(item.carData.throttle).filter(
          (e, i) => i % nth === nth - 1
        );
        brakeSeriesValues = Object.values(item.carData.brake).filter(
          (e, i) => i % nth === nth - 1
        );
        rpmSeriesValues = Object.values(item.carData.rpm).filter(
          (e, i) => i % nth === nth - 1
        );
        gearSeriesValues = Object.values(item.carData.gear).filter(
          (e, i) => i % nth === nth - 1
        );
        drsSeriesValues = Object.values(item.carData.drs).filter(
          (e, i) => i % nth === nth - 1
        );
        //
        color = item.color;
        driverName = item.fullName;
        //
        //   if (!categories.includes(i)) {
        //     categories.push(i);
        //   }
        //   i++;
        // });

        const name = driverName ? driverName : key;

        speedSeries.push({
          name: name,
          data: speedSeriesValues,
        });
        throttleSeries.push({
          name: name,
          data: throttleSeriesValues,
        });
        brakeSeries.push({
          name: name,
          data: brakeSeriesValues,
        });
        rpmSeries.push({
          name: name,
          data: rpmSeriesValues,
        });
        gearSeries.push({
          name: name,
          data: gearSeriesValues,
        });
        drsSeries.push({
          name: name,
          data: drsSeriesValues,
        });

        colors.push(color === "#ffffff" ? "#d4d4d4" : color);

        if (speedSeries.length > maxLength) {
          maxLength = speedSeries.length;
        }
      });

      // for (let i = 0; i < series.length; i++) {
      //   while (series[i].data.length < maxLength) {
      //     series[i].data.push(null);
      //   }
      // }

      console.log(speedSeries);

      this.speedSeries = speedSeries;
      this.throttleSeries = throttleSeries;
      this.brakeSeries = brakeSeries;
      this.rpmSeries = rpmSeries;
      this.gearSeries = gearSeries;
      this.drsSeries = drsSeries;

      const endTime = performance.now();

      console.log(`Call took ${endTime - startTime}`);

      return [colors, categories];
    },
    async loadLapData() {
      this.isLoading = true;
      await sessionLapDetailedTelemetryService(
        this.round,
        this.session,
        this.lap
      )
        .then((result) => {
          this.results = result;

          this.setSeries();
          const [colors, categories] = this.setSeries();

          const chartOptions = {
            animations: {
              enabled: true,
              easing: "easeout",
              speed: 300,
              animateGradually: {
                enabled: false,
              },
              dynamicAnimation: {
                enabled: false,
              },
            },
            group: "telemetry",
          };

          const xAxisOptions = {
            categories: categories,
            labelsOptions: {
              show: false,
            },
          };

          const yAxisLabel = {
            minWidth: 40,
          };

          const dataLabelsOptions = {
            enabled: false,
          };

          const legendOptions = {
            show: true,
            showForSingleSeries: false,
            position: "left",
            fontFamily: "Poppins",
          };

          this.speedChartOptions = {
            chart: chartOptions,
            xaxis: xAxisOptions,
            yaxis: {
              labels: yAxisLabel,
            },
            colors: colors,
            stroke: {
              curve: "smooth",
            },
            dataLabels: dataLabelsOptions,
            legend: legendOptions,
          };

          this.throttleChartOptions = {
            chart: chartOptions,
            xaxis: xAxisOptions,
            yaxis: {
              labels: yAxisLabel,
              max: 100,
            },
            colors: colors,
            stroke: {
              curve: "smooth",
            },
            dataLabels: dataLabelsOptions,
            legend: legendOptions,
          };

          this.brakeChartOptions = {
            chart: chartOptions,
            xaxis: xAxisOptions,
            yaxis: {
              labels: yAxisLabel,
              max: 100,
            },
            colors: colors,
            stroke: {
              curve: "stepline",
            },
            dataLabels: dataLabelsOptions,
            legend: legendOptions,
          };

          this.rpmChartOptions = {
            chart: chartOptions,
            xaxis: xAxisOptions,
            colors: colors,
            stroke: {
              curve: "smooth",
            },
            dataLabels: dataLabelsOptions,
            legend: legendOptions,
          };

          this.gearChartOptions = {
            chart: chartOptions,
            xaxis: xAxisOptions,
            colors: colors,
            yaxis: {
              labels: yAxisLabel,
              max: 8,
            },
            stroke: {
              curve: "stepline",
            },
            dataLabels: dataLabelsOptions,
            legend: legendOptions,
          };

          this.drsChartOptions = {
            chart: chartOptions,
            xaxis: xAxisOptions,
            colors: colors,
            stroke: {
              curve: "stepline",
            },
            dataLabels: dataLabelsOptions,
            legend: legendOptions,
          };
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  watch: {
    lap() {
      clearTimeout(this.lapLoadingDebounce);
      this.lapLoadingDebounce = setTimeout(() => {
        this.loadLapData();
      }, 1000);
    },
    chartMode() {
      // const [colors, categories] = this.setSeries();
      //
      // let title;
      // let formatter;
      // switch (this.chartMode) {
      //   case "sector1":
      //     title = "Time";
      //     formatter = function (val) {
      //       return msToTime(val).toStringFormatted(true);
      //     };
      //     break;
      //   case "sector2":
      //     title = "Time";
      //     formatter = function (val) {
      //       return msToTime(val).toStringFormatted(true);
      //     };
      //     break;
      //   case "sector3":
      //     title = "Time";
      //     formatter = function (val) {
      //       return msToTime(val).toStringFormatted(true);
      //     };
      //     break;
      //   case "s1SpeedTrap":
      //     title = "Speed (km/h)";
      //     formatter = function (val) {
      //       return `${val} km/h`;
      //     };
      //     break;
      //   case "s2SpeedTrap":
      //     title = "Speed (km/h)";
      //     formatter = function (val) {
      //       return `${val} km/h`;
      //     };
      //     break;
      //   default:
      //     title = "Time";
      //     formatter = function (val) {
      //       return msToTime(val).toStringFormatted(true);
      //     };
      //     break;
      // }
      //
      // this.chartOptions = {
      //   xaxis: {
      //     categories: categories,
      //   },
      //   yaxis: {
      //     title: {
      //       text: title,
      //     },
      //     labels: {
      //       formatter: formatter,
      //     },
      //   },
      //   tooltip: {
      //     y: {
      //       formatter: formatter,
      //     },
      //   },
      //   colors: colors,
      // };
    },
  },
};
</script>

<style scoped></style>
