<template>
  <svg viewBox="0 0 1920 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="text-country">
        <text class="country-text" text-anchor="middle" x="50%" y="139">
          {{ circuit.location.country }}
        </text>
      </clipPath>
      <clipPath id="text-year">
        <text class="year-text" text-anchor="middle" x="50%" y="225">
          {{ $store.getters.currentSeasonYear }}
        </text>
      </clipPath>
    </defs>
    <g id="Layer_2" data-name="Layer 2" width="100%">
      <g id="main" width="100%">
        <rect class="fill-white" height="540" width="1920" y="1.75" />
        <g id="bg-objects">
          <polygon
            class="fill-dark-gray"
            points="797.85 197.44 786.19 279.14 769.24 397.93 757.02 483.52 748.71 541.75 536.65 541.75 525.21 540.12 455.48 530.17 438.16 527.69 402.1 522.55 384.77 520.08 370.51 518.04 373.57 496.58 376.87 473.48 387.57 398.5 415.43 203.25 418.17 184.09 423.88 144.07 454.07 148.38 485.64 152.88 614.76 171.31 797.85 197.44"
          />
          <polygon
            class="fill-gray"
            points="696.3 1.75 485.64 152.88 415.43 203.25 356.21 245.74 418.17 184.09 454.07 148.38 601.44 1.75 696.3 1.75"
          />
        </g>
        <g id="large-panels">
          <polygon
            :fill="circuit.details.primaryColor"
            points="1513.25 170.25 1141.75 541.75 244.32 541.75 784.32 1.75 1341.24 1.75 1342.99 0 1344.75 1.75 1363.87 20.88 1472.75 129.76 1513.25 170.25"
          />
          <polygon
            :fill="circuit.details.secondaryColor"
            points="1920 112.7 1920 224.1 1602.35 541.75 698.79 541.75 1238.79 1.75 1341.24 1.75 1342.99 0 1344.75 1.75 1809.05 1.75 1814.98 7.68 1831.13 23.83 1836.25 28.95 1920 112.7"
          />
          <polygon
            :fill="circuit.details.tertiaryColor"
            points="1920 1.75 1920 541.75 1060.76 541.75 1600.76 1.75 1920 1.75"
          />
        </g>
        <g id="tertiary-color">
          <polygon
            :fill="circuit.details.tertiaryColor"
            points="668.25 201.9 373.57 496.58 328.4 541.75 308.6 541.75 658.35 192 661.9 195.55 668.25 201.9"
          />
          <polygon
            :fill="circuit.details.tertiaryColor"
            points="723.08 201.57 402.1 522.55 382.9 541.75 363.1 541.75 713.18 191.67 718.82 197.3 723.08 201.57"
          />
          <polygon
            :fill="circuit.details.tertiaryColor"
            points="648.08 337.57 455.48 530.17 443.9 541.75 424.1 541.75 638.18 327.67 648.08 337.57"
          />
          <polygon
            :fill="circuit.details.tertiaryColor"
            points="1341.24 1.75 1175.82 167.17 1165.92 157.27 1321.44 1.75 1341.24 1.75"
          />
          <polygon
            :fill="circuit.details.tertiaryColor"
            points="1383 1.75 1393.24 1.75 1227.82 167.17 1222.7 162.05 1383 1.75"
          />
        </g>
        <g id="secondary-color">
          <polygon
            :fill="circuit.details.primaryColor"
            points="1274.15 250.27 982.67 541.75 947.33 541.75 1256.48 232.6 1264.52 240.64 1274.15 250.27"
          />
          <polygon
            :fill="circuit.details.primaryColor"
            points="1920 152.74 1920 188.1 1770.86 337.24 1761.02 327.4 1753.18 319.56 1920 152.74"
          />
        </g>
        <g id="primary-color">
          <polygon
            :fill="circuit.details.secondaryColor"
            points="1716.85 1.75 1728.15 1.75 1539.97 189.94 1188.16 541.75 1176.84 541.75 1716.85 1.75"
          />
          <polygon
            :fill="circuit.details.secondaryColor"
            points="1772.43 1.75 1569.22 204.97 1232.43 541.75 1221.12 541.75 1761.12 1.75 1772.43 1.75"
          />
          <polygon
            :fill="circuit.details.secondaryColor"
            points="1820.9 1.75 1814.98 7.68 1610.65 212 1607.76 209.1 1605.53 206.88 1809.86 2.56 1810.66 1.75 1820.9 1.75"
          />
          <polygon
            :fill="circuit.details.secondaryColor"
            points="1863.45 1.75 1836.25 28.95 1653.24 211.96 1648.12 206.84 1831.13 23.83 1853.21 1.75 1863.45 1.75"
          />
          <polygon
            :fill="circuit.details.secondaryColor"
            points="1761.02 212.29 1431.57 541.75 1421.33 541.75 1755.91 207.17 1758.35 209.62 1761.02 212.29"
          />
        </g>
        <g id="other">
          <polygon
            class="fill-light-gray"
            points="1165.42 1.75 625.42 541.75 523.58 541.75 1063.58 1.75 1165.42 1.75"
          />
        </g>
        <g id="text-country" class="text-country-clipping" width="100%">
          <polygon
            :fill="circuit.details.tertiaryColor"
            points="1704.25 170.25 1205.3 541.75 0 541.75 725.25 1.75 1473.23 1.75 1475.58 0 1477.94 1.75 1503.62 20.88 1649.86 129.76 1704.25 170.25"
          />
          <polygon
            :fill="circuit.details.primaryColor"
            points="1920 112.7 1920 224.1 1602.35 541.75 698.79 541.75 1238.79 1.75 1341.24 1.75 1342.99 0 1344.75 1.75 1809.05 1.75 1814.98 7.68 1831.13 23.83 1836.25 28.95 1920 112.7"
          />
          <polygon
            :fill="circuit.details.secondaryColor"
            points="1920 1.75 1920 541.75 1060.76 541.75 1600.76 1.75 1920 1.75"
          />
        </g>
        <g id="text-year" class="text-year-clipping" width="100%">
          <polygon
            :fill="circuit.details.tertiaryColor"
            points="1704.25 170.25 1205.3 541.75 0 541.75 725.25 1.75 1473.23 1.75 1475.58 0 1477.94 1.75 1503.62 20.88 1649.86 129.76 1704.25 170.25"
          />
          <polygon
            :fill="circuit.details.primaryColor"
            points="1920 112.7 1920 224.1 1602.35 541.75 698.79 541.75 1238.79 1.75 1341.24 1.75 1342.99 0 1344.75 1.75 1809.05 1.75 1814.98 7.68 1831.13 23.83 1836.25 28.95 1920 112.7"
          />
          <polygon
            :fill="circuit.details.secondaryColor"
            points="1920 1.75 1920 541.75 1060.76 541.75 1600.76 1.75 1920 1.75"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
import ScheduleItem from "@/classes/ScheduleItem";

export default {
  name: "weekend-banner",
  props: {
    schedule: {
      type: ScheduleItem,
      default() {
        return new ScheduleItem();
      },
    },
  },
  computed: {
    circuit() {
      return this.schedule.circuit;
    },
  },
};
</script>

<style lang="scss" scoped>
.fill-white {
  fill: #fff;
}

.fill-dark-gray {
  fill: #363636;
}

.fill-gray {
  fill: #747474;
}

.fill-light-gray {
  fill: #dedede;
}

.country-text {
  font-size: 110px;
}

.year-text,
.country-text {
  font-family: Formula1;
  font-weight: 700;
}

.year-text {
  font-size: 70px;
}

.text-country-clipping {
  clip-path: url(#text-country);
}

.text-year-clipping {
  clip-path: url(#text-year);
}
</style>
