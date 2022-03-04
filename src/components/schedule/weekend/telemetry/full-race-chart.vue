<template>
  <loading-indicator v-if="isLoading" />
  <div v-else class="mt-10">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <apexchart
          :options="chartOptions"
          :series="series"
          height="600"
          type="bar"
          width="100%"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SessionResult from "@/classes/SessionResult";
import { getSessionLapsTelemetry } from "@/services/session-laps-telemetry-service";
import LoadingIndicator from "@/components/loading-indicator";
import msToTime from "@/helpers/msToTime";

export default {
  name: "full-race-chart",
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
    chartOptions: {
      chart: {
        id: "vuechart-example",
      },
      xaxis: {
        categories: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ],
        show: true,
        labels: {
          formatter: function (val) {
            return `+ ${msToTime(val).toStringFormatted()}`;
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          distributed: true,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: ["black"],
        width: 1,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `+ ${msToTime(val).toStringFormatted()}`;
        },
        textAnchor: "middle",
        style: {
          fontFamily: "Poppins",
        },
      },
    },
    series: [],
  }),
  mounted() {
    this.isLoading = true;
    getSessionLapsTelemetry(this.round, this.session)
      .then((result) => {
        this.results = result;
        console.log(result.length);
        // const seriesValues = [];
        // const categories = [];
        // const colors = [];
        // this.results.forEach((result) => {
        // seriesValues.push(result.lapTimeDeltaBase);
        // categories.push(result.driverCode);
        // colors.push(result.color);

        // const seriesItem = {
        //   name: "Result",
        //   data: [],
        // };

        // console.log(result);
        // });
        //
        // this.series = [
        //   {
        //     name: "Result",
        //     data: seriesValues,
        //   },
        // ];

        // const sessionResults = this.results;
        // this.chartOptions = {
        //   xaxis: {
        //     categories: categories,
        //   },
        //   tooltip: {
        //     enabled: true,
        //     x: {
        //       show: true,
        //       formatter: function (val, opts) {
        //         const result = sessionResults[opts.dataPointIndex];
        //         return `${result.fullName}`;
        //       },
        //     },
        //     y: {
        //       show: true,
        //       formatter: function (val, opts) {
        //         const result = sessionResults[opts.dataPointIndex];
        //         return `${result.lapTime.toStringFormatted(true)}`;
        //       },
        //     },
        //   },
        //   colors: colors,
        // };
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped></style>
