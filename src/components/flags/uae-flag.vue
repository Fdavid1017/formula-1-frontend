<template>
  <svg viewBox="0 0 1016.62 607.6" xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Abu_Dhabi">
        <g id="flag">
          <rect class="uae-1" height="202.53" width="1016.62" />
          <rect class="uae-2" height="202.53" width="1016.62" y="202.53" />
          <rect height="202.53" width="1016.62" y="405.06" />
          <rect class="uae-3" height="607.6" width="316.63" />
        </g>
        <rect
          id="line-1"
          class="uae-1"
          height="320"
          width="7.73"
          x="231.61"
          y="34.81"
        />
        <rect
          id="line-2"
          class="uae-1"
          height="228"
          width="9.33"
          x="199.17"
          y="121.47"
        />
        <rect id="line-3" height="382.07" width="9.33" x="43.17" y="164.73" />
        <rect id="line-4" height="134.39" width="8" x="13.84" y="11.08" />
        <rect
          id="line-5"
          class="uae-2"
          height="434.58"
          width="19.14"
          x="139.17"
          y="53.56"
        />
        <rect
          id="line-6"
          class="uae-4"
          height="149.33"
          width="4.46"
          x="395.73"
          y="34.81"
        />
        <rect
          id="line-7"
          class="uae-4"
          height="209.1"
          width="6.67"
          x="561.84"
          y="66.81"
        />
        <rect
          id="line-8"
          class="uae-4"
          height="244"
          width="8"
          x="532.51"
          y="184.14"
        />
        <rect
          id="line-9"
          class="uae-5"
          height="445.5"
          width="6.67"
          x="933.84"
          y="53.56"
        />
        <rect
          id="line-10"
          class="uae-5"
          height="288.96"
          width="10.89"
          x="738.95"
          y="66.81"
        />
        <rect
          id="line-11"
          class="uae-5"
          height="204.04"
          width="8"
          x="444.51"
          y="66.81"
        />
        <rect
          id="line-12"
          class="uae-6"
          height="314.92"
          width="9.33"
          x="621.84"
          y="184.14"
        />
        <rect
          id="line-13"
          class="uae-6"
          height="226.67"
          width="10.27"
          x="823.17"
          y="128.14"
        />
        <rect
          id="line-14"
          class="uae-6"
          height="200"
          width="8"
          x="341.84"
          y="373.47"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "UaeFlag",
};
</script>

<style lang="scss" scoped>
@import "flag-animations";

.uae-1 {
  fill: #00732e;
}

.uae-2 {
  fill: #fff;
}

.uae-3 {
  fill: #fe0000;
}

.uae-4 {
  fill: #ddd;
}

.uae-5 {
  fill: #005b25;
}

.uae-6 {
  fill: #1a1a1a;
}

svg {
  #Layer_2 {
    #Abu_Dhabi {
      #line-1 {
        animation: topToBottom 3.5s infinite linear;
      }

      #line-2 {
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
      #line-12,
      #line-13 {
        animation: topToBottom 4s infinite linear;
      }

      #line-14 {
        animation: topToBottom 2.75s infinite linear;
      }
    }
  }
}
</style>
