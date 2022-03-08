<template>
  <div class="mt-10 relative" style="z-index: 0">
    <v-row justify="center">
      <v-col class="d-flex align-center" cols="12" md="8">
        <v-slider
          v-model="lap"
          :disabled="isLoading"
          :label="`Lap ${lap}`"
          :loading="isLoading"
          :max="maxLap"
          color="primary"
          hide-details
          min="1"
          thumb-label
          track-color="gray"
        />
      </v-col>
      <v-col class="d-flex align-center" cols="12" md="4">
        <v-autocomplete
          v-model="selectedDrivers"
          :disabled="isLoading"
          :items="drivers"
          :loading="isLoading"
          chips
          dense
          hide-details
          hide-selected
          item-text="code"
          label="Drivers"
          multiple
          outlined
          return-object
        >
          <template slot="item" slot-scope="{ item }">
            <div
              :style="{ color: mapTeamColor(item.color) }"
              class="text-center font-weight-bold"
            >
              {{ item.code }}
            </div>
          </template>
          <template slot="selection" slot-scope="{ item }">
            <v-chip
              :color="mapTeamColor(item.color)"
              class="font-weight-bold"
              small
              text-color="white"
            >
              {{ item.code }}
            </v-chip>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <loading-indicator v-if="isLoading" />
    <v-row v-else justify="center">
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
import { sessionDriversService } from "@/services/session-drivers-service";

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
    drivers: [],
    selectedDrivers: [],
  }),
  async mounted() {
    this.isLoading = true;

    await largestLapNumberService(this.round, this.session).then((response) => {
      this.maxLap = response.largestLapNumber;
    });

    await sessionDriversService(this.round, this.session).then((response) => {
      response.sort((a, b) => {
        const aTeam = a.team;
        const bTeam = b.team;

        if (aTeam === bTeam) {
          const aName = a.fullName;
          const bName = b.fullName;

          return aName > bName ? 1 : -1;
        }

        return aTeam > bTeam ? 1 : -1;
      });

      this.drivers = response;
    });

    await this.loadLapData();
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
        const nth = 2;
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
        // if (!categories.includes(Object.values(item.carData.distance))) {
        //   categories.concat(Object.values(item.carData.distance));
        // }
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

        colors.push(this.mapTeamColor(color));

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
        this.lap,
        this.selectedDrivers.map((x) => x.code)
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
            labels: {
              show: false,
            },
          };

          const dataLabelsOptions = {
            enabled: false,
          };

          const legendOptions = {
            show: false,
            showForSingleSeries: false,
            position: "left",
            fontFamily: "Poppins",
          };

          this.speedChartOptions = {
            chart: chartOptions,
            xaxis: xAxisOptions,
            yaxis: {
              labels: {
                formatter: function (val) {
                  return `${val} km/h`;
                },
              },
              title: {
                text: "Speed (km/h)",
              },
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
              labels: {
                formatter: function (val) {
                  return `${val} %`;
                },
              },
              max: 100,
              title: {
                text: "Throttle %",
              },
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
              labels: {
                formatter: function (val) {
                  return `${val} %`;
                },
              },
              max: 100,
              title: {
                text: "Brake %",
              },
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
            yaxis: {
              labels: {
                formatter: function (val) {
                  return `${val} RPM`;
                },
              },
              title: {
                text: "RPM",
              },
            },
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
              labels: {
                formatter: function (val) {
                  return val;
                },
              },
              max: 8,
              title: {
                text: "Gear",
              },
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
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val <= 8 ? "OFF" : "ON";
                },
              },
              title: {
                text: "DRS",
              },
            },
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
    mapTeamColor(color) {
      return color === "#ffffff" ? "#d4d4d4" : color;
    },
  },
  watch: {
    lap() {
      clearTimeout(this.lapLoadingDebounce);
      this.lapLoadingDebounce = setTimeout(() => {
        this.loadLapData();
      }, 1000);
    },
    selectedDrivers() {
      this.loadLapData();
    },
  },
};
</script>

<style scoped></style>
