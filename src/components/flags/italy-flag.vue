<template>
  <svg viewBox="0 0 1016.62 607.6" xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Italy">
        <rect class="italy-1" height="607.6" width="1016.62" />
        <polygon
          class="italy-2"
          points="1016.62 607.6 683.99 607.6 619.28 0 1016.62 0 1016.62 607.6"
        />
        <polygon
          class="italy-3"
          points="332.63 607.6 0 607.6 0 0 352.24 0 332.63 607.6"
        />
        <rect
          id="line-1"
          class="italy-2"
          height="565.31"
          width="13.18"
          x="56.8"
          y="42.28"
        />
        <rect
          id="line-2"
          class="italy-2"
          height="231.92"
          width="6.08"
          x="81.14"
        />
        <rect
          id="line-3"
          class="italy-2"
          height="411.41"
          width="5.07"
          x="101.42"
        />
        <rect
          id="line-4"
          class="italy-2"
          height="216"
          width="6.08"
          x="217.03"
          y="243.07"
        />
        <rect
          id="line-5"
          class="italy-2"
          height="392.8"
          width="6.08"
          x="639.9"
          y="115.96"
        />
        <rect
          id="line-6"
          class="italy-2"
          height="399.55"
          width="3.04"
          x="458.38"
          y="140.65"
        />
        <rect
          id="line-7"
          class="italy-2"
          height="222.79"
          width="10.14"
          x="529.37"
        />
        <rect
          id="line-8"
          class="italy-2"
          height="238.31"
          width="5.31"
          x="503"
          y="9.83"
        />
        <rect
          id="line-9"
          class="italy-2"
          height="248.14"
          width="4.06"
          x="486.77"
        />
        <rect
          id="line-10"
          class="italy-3"
          height="396.97"
          width="6.08"
          x="582.1"
          y="210.62"
        />
        <rect
          id="line-11"
          class="italy-3"
          height="210.62"
          width="10.14"
          x="614.55"
        />
        <rect
          id="line-12"
          class="italy-3"
          height="242.37"
          width="3.04"
          x="402.61"
          y="42.28"
        />
        <rect
          id="line-13"
          class="italy-3"
          height="210.93"
          width="4.06"
          x="515.17"
          y="248.14"
        />
        <rect
          id="line-14"
          class="italy-3"
          height="459.07"
          width="8.11"
          x="873.14"
        />
        <rect
          id="line-15"
          class="italy-3"
          height="317.41"
          width="3.04"
          x="753.48"
          y="100.09"
        />
        <rect
          id="line-16"
          class="italy-3"
          height="353.76"
          width="5.07"
          x="860.97"
          y="105.31"
        />
        <rect
          id="line-17"
          class="italy-3"
          height="261.09"
          width="5.07"
          x="894.44"
          y="346.51"
        />
        <rect
          id="line-18"
          class="italy-1"
          height="312.36"
          width="5.07"
          x="990.77"
        />
        <rect
          id="line-19"
          class="italy-1"
          height="340.42"
          width="8.11"
          x="966.44"
        />
        <rect
          id="line-20"
          class="italy-1"
          height="161.24"
          width="13.18"
          x="797.08"
          y="73.72"
        />
        <rect
          id="line-21"
          class="italy-1"
          height="111.55"
          width="5.07"
          x="686.55"
          y="35.18"
        />
        <rect
          id="line-22"
          class="italy-1"
          height="343.77"
          width="4.06"
          x="281.93"
          y="29.1"
        />
        <rect
          id="line-23"
          class="italy-1"
          height="342.21"
          width="5.07"
          x="140.97"
          y="265.38"
        />
        <rect
          id="line-24"
          class="italy-1"
          height="231.92"
          width="8.46"
          x="176.12"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "ItalyFlag",
};
</script>

<style lang="scss" scoped>
@import "flag-animations";

.italy-1 {
  fill: #f2f2f2;
}

.italy-2 {
  fill: #ed2839;
}

.italy-3 {
  fill: #009247;
}

svg {
  #Layer_2 {
    #Italy {
      #line-1,
      #line-21,
      #line-22 {
        animation: topToBottom 3.5s infinite linear;
      }

      #line-2,
      #line-19,
      #line-20 {
        animation: topToBottom 2.5s infinite linear;
      }

      #line-3,
      #line-4,
      #line-8 {
        animation: topToBottom 2s infinite linear;
      }

      #line-5,
      #line-17,
      #line-18,
      #line-23 {
        animation: topToBottom 4s infinite linear;
      }

      #line-6,
      #line-7,
      #line-25 {
        animation: bottomToTop 3s infinite linear;
      }

      #line-9,
      #line-11,
      #line-24 {
        animation: bottomToTop 5s infinite linear;
      }

      #line-10,
      #line-11,
      #line-12,
      #line-13 {
        animation: topToBottom 4s infinite linear;
      }

      #line-14,
      #line-15,
      #line-16,
      #line-25 {
        animation: topToBottom 2.75s infinite linear;
      }
    }
  }
}
</style>
