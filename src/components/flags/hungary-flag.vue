<template>
  <svg viewBox="0 0 1016.89 607.6" xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Hungary">
        <rect class="hungary-1" height="607.6" width="1016.89" />
        <polygon
          class="hungary-2"
          points="1016.62 607.6 0 607.6 0 202.75 1016.62 221.51 1016.62 607.6"
        />
        <polygon
          class="hungary-3"
          points="1016.62 390.52 0 409.62 0 607.6 1016.62 607.6 1016.62 390.52"
        />
        <rect
          id="line-1"
          class="hungary-3"
          height="214.48"
          width="9.13"
          x="40.32"
          y="26.3"
        />
        <rect
          id="line-2"
          class="hungary-3"
          height="214.48"
          width="9.13"
          x="60.1"
          y="44.06"
        />
        <rect
          id="line-3"
          class="hungary-3"
          height="311.8"
          width="4.56"
          x="78.35"
          y="70.44"
        />
        <rect
          id="line-4"
          class="hungary-3"
          height="307.3"
          width="9.13"
          x="939.31"
          y="11.08"
        />
        <rect
          id="line-5"
          class="hungary-3"
          height="222.35"
          width="12.17"
          x="228.94"
          y="70.44"
        />
        <rect
          id="line-6"
          class="hungary-3"
          height="222.35"
          width="6.08"
          x="740.04"
          y="22.36"
        />
        <rect
          id="line-7"
          class="hungary-3"
          height="347.42"
          width="6.08"
          x="447.99"
          y="22.36"
        />
        <rect
          id="line-8"
          class="hungary-2"
          height="222.35"
          width="6.08"
          x="720.27"
          y="53.56"
        />
        <rect
          id="line-9"
          class="hungary-2"
          height="248.64"
          transform="translate(415.29 248.64) rotate(180)"
          width="6.09"
          x="204.6"
        />
        <rect
          id="line-10"
          class="hungary-2"
          height="156.3"
          transform="translate(1067.76 201.03) rotate(180)"
          width="13.59"
          x="527.09"
          y="22.36"
        />
        <rect
          id="line-11"
          class="hungary-2"
          height="156.3"
          transform="translate(80.65 998.12) rotate(180)"
          width="13.59"
          x="33.53"
          y="420.91"
        />
        <rect
          id="line-12"
          class="hungary-2"
          height="156.3"
          transform="translate(1749.43 920.78) rotate(180)"
          width="13.59"
          x="867.92"
          y="382.24"
        />
        <rect
          id="line-13"
          class="hungary-2"
          height="156.3"
          transform="translate(730.07 895.87) rotate(180)"
          width="13.59"
          x="358.24"
          y="369.78"
        />
        <rect
          id="line-14"
          class="hungary-1"
          height="280.03"
          transform="translate(968.96 640.75) rotate(180)"
          width="6.79"
          x="481.09"
          y="180.36"
        />
        <rect
          id="line-15"
          class="hungary-1"
          height="195.64"
          transform="translate(1377.56 895.87) rotate(180)"
          width="7.81"
          x="684.87"
          y="350.11"
        />
        <rect
          id="line-16"
          class="hungary-1"
          height="292.96"
          width="5.98"
          x="152.99"
          y="233.13"
        />
        <rect
          id="line-17"
          class="hungary-1"
          height="195.64"
          transform="translate(1825.18 661.89) rotate(180)"
          width="7.81"
          x="908.68"
          y="233.13"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "HungaryFlag",
};
</script>

<style lang="scss" scoped>
@import "flag-animations";

.hungary-1 {
  fill: #cd2a3d;
}

.hungary-2 {
  fill: #fff;
}

.hungary-3 {
  fill: #436f4c;
}

svg {
  #Layer_2 {
    #Hungary {
      #line-1 {
        animation: topToBottom 3.5s infinite linear;
      }

      #line-2,
      #line-17 {
        animation: topToBottom 2.5s infinite linear;
      }

      #line-3,
      #line-4,
      #line-8 {
        animation: topToBottom 2s infinite linear;
      }

      #line-5 {
        animation: topToBottom 4s infinite linear;
      }

      #line-6,
      #line-7 {
        animation: bottomToTop 3s infinite linear;
      }

      #line-9,
      #line-11 {
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
      #line-16 {
        animation: topToBottom 2.75s infinite linear;
      }
    }
  }
}
</style>
