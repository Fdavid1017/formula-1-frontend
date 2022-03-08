<template>
  <loading-indicator v-if="isLoading" />
  <div v-else class="mt-10 relative" style="z-index: 0">
    <v-row justify="center">
      <v-col cols="12">
        <apexchart
          ref="sessionChart"
          :options="chartOptions"
          :series="series"
          height="800"
          type="line"
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
  name: "full-session-chart",
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
    chartMode: {
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
      },
    },
    series: [],
  }),
  mounted() {
    this.isLoading = true;
    getSessionLapsTelemetry(this.round, this.session)
      .then((result) => {
        this.results = result;

        const [colors, categories] = this.setSeries();

        this.chartOptions = {
          chart: {
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
          },
          xaxis: {
            categories: categories,
            title: {
              text: "Laps",
              style: {
                fontSize: "12px",
                fontFamily: "Poppins",
                fontWeight: 600,
              },
            },
            labels: {
              show: true,
              showDuplicates: false,
              style: {
                colors: [],
                fontSize: "12px",
                fontFamily: "Poppins",
              },
            },
          },
          yaxis: {
            title: {
              text: "Time",
              style: {
                fontSize: "12px",
                fontFamily: "Poppins",
                fontWeight: 600,
              },
            },
            labels: {
              show: true,
              showDuplicates: false,
              style: {
                colors: [],
                fontSize: "12px",
                fontFamily: "Poppins",
              },
              formatter: function (val) {
                return msToTime(val).toStringFormatted(true);
              },
            },
          },
          tooltip: {
            enabled: true,
            x: {
              show: true,
              formatter: function (val) {
                return `Lap ${val}`;
              },
            },
            y: {
              show: true,
              formatter: function (val) {
                return msToTime(val).toStringFormatted(true);
              },
            },
          },
          colors: colors,
          stroke: {
            curve: "smooth",
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: true,
            showForSingleSeries: false,
            position: "left",
            fontFamily: "Poppins",
          },
          responsive: [
            {
              breakpoint: 960,
              options: {
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        };
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    setSeries() {
      const series = [];
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

        const aTeam = aValues[0].team;
        const bTeam = bValues[0].team;

        if (aTeam === bTeam) {
          const aName = aValues[0].fullName;
          const bName = bValues[0].fullName;

          return aName > bName ? 1 : -1;
        }

        return aTeam > bTeam ? 1 : -1;
      });

      resultKeys.forEach((key) => {
        const seriesValues = [];
        let color;
        let driverName;
        let i = 1;
        this.results[key].forEach((item) => {
          switch (this.chartMode) {
            case "sector1":
              seriesValues.push(item.sector1TimeBase);
              break;
            case "sector2":
              seriesValues.push(item.sector2TimeBase);
              break;
            case "sector3":
              seriesValues.push(item.sector2TimeBase);
              break;
            case "s1SpeedTrap":
              seriesValues.push(item.speedI1);
              break;
            case "s2SpeedTrap":
              seriesValues.push(item.speedI2);
              break;
            default:
              seriesValues.push(item.lapTimeBase);
              break;
          }

          color = item.color;
          driverName = item.fullName;

          if (!categories.includes(i)) {
            categories.push(i);
          }
          i++;
        });
        series.push({
          name: driverName ? driverName : key,
          data: seriesValues,
        });
        colors.push(color === "#ffffff" ? "#d4d4d4" : color);

        if (seriesValues.length > maxLength) {
          maxLength = seriesValues.length;
        }
      });

      for (let i = 0; i < series.length; i++) {
        while (series[i].data.length < maxLength) {
          series[i].data.push(null);
        }
      }

      this.series = series;

      return [colors, categories];
    },
  },
  watch: {
    chartMode() {
      const [colors, categories] = this.setSeries();

      let title;
      let formatter;
      switch (this.chartMode) {
        case "sector1":
          title = "Time";
          formatter = function (val) {
            return msToTime(val).toStringFormatted(true);
          };
          break;
        case "sector2":
          title = "Time";
          formatter = function (val) {
            return msToTime(val).toStringFormatted(true);
          };
          break;
        case "sector3":
          title = "Time";
          formatter = function (val) {
            return msToTime(val).toStringFormatted(true);
          };
          break;
        case "s1SpeedTrap":
          title = "Speed (km/h)";
          formatter = function (val) {
            return `${val} km/h`;
          };
          break;
        case "s2SpeedTrap":
          title = "Speed (km/h)";
          formatter = function (val) {
            return `${val} km/h`;
          };
          break;
        default:
          title = "Time";
          formatter = function (val) {
            return msToTime(val).toStringFormatted(true);
          };
          break;
      }

      this.chartOptions = {
        xaxis: {
          categories: categories,
        },
        yaxis: {
          title: {
            text: title,
          },
          labels: {
            formatter: formatter,
          },
        },
        tooltip: {
          y: {
            formatter: formatter,
          },
        },
        colors: colors,
      };
    },
  },
};
</script>

<style scoped></style>
