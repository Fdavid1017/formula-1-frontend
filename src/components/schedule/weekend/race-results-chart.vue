<template>
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
</template>

<script>
import msToTime from "@/helpers/msToTime";
import RaceResult from "@/classes/RaceResult";

export default {
  name: "race-results-chart",
  props: {
    results: {
      type: Array[RaceResult],
      default() {
        return [];
      },
    },
  },
  data: () => ({
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
          return `+ ${msToTime(val).toStringFormatted(true)}`;
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
    const seriesValues = [];
    const categories = [];
    const colors = [];
    this.results.forEach((result) => {
      seriesValues.push(result.timeMillis);
      categories.push(result.driver.driver.driverId);
      colors.push(result.driver.team.color.primary);
    });

    this.series = [
      {
        name: "Result",
        data: seriesValues,
      },
    ];

    const sessionResults = this.results;
    this.chartOptions = {
      xaxis: {
        categories: categories,
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
          formatter: function (val, opts) {
            const result = sessionResults[opts.dataPointIndex];
            return `${result.driver.fullName()}`;
          },
        },
        y: {
          show: true,
          formatter: function (val, opts) {
            const result = sessionResults[opts.dataPointIndex];
            return `${result.time.toStringFormatted(true)}`;
          },
        },
      },
      colors: colors,
    };
  },
};
</script>

<style scoped></style>
