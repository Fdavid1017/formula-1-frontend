<template>
  <svg
    viewBox="0 0 1016.62 896.34"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <clipPath id="clip-path" transform="translate(0 171.68)">
        <rect class="bahrain-1" height="607.6" width="1016.62" />
      </clipPath>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Bahrain">
        <g class="bahrain-2">
          <path
            class="bahrain-3"
            d="M271.45.17Q639.76.17,1008.07,0c7.15,0,8.56,1.4,8.55,8.54q-.37,295.27,0,590.55c0,7.15-1.4,8.56-8.55,8.55q-372.48-.36-745-.2c1.11-2.57,3.82-2.92,5.9-3.75,24.77-10,49.64-19.68,74.44-29.57,20.1-8,40.13-16.21,62.54-25.26L252.25,487.25l153.8-61.76L252.21,363.88l153.86-61.73L252.21,240.52,406,178.79,252.23,117.16,406,55.45c-28.2-11.33-54-21.46-79.6-32.07C308,15.77,288.81,10.18,271.45.17Z"
            transform="translate(0 171.68)"
          />
          <path
            class="bahrain-4"
            d="M271.45.17c17.36,10,36.59,15.6,55,23.21C352,34,377.81,44.12,406,55.45L252.23,117.16,406,178.79,252.21,240.52l153.86,61.63L252.21,363.88l153.84,61.61-153.8,61.76L406,548.84c-22.41,9-42.44,17.23-62.54,25.26-24.8,9.89-49.67,19.61-74.44,29.57-2.08.83-4.79,1.18-5.9,3.75q-127.82,0-255.63.18c-6.22,0-7.48-1.26-7.47-7.48Q.32,303.79,0,7.48C0,1.26,1.25,0,7.47,0Q139.47.39,271.45.17Z"
            transform="translate(0 171.68)"
          />
          <rect
            id="line-1"
            class="bahrain-5"
            height="387.38"
            width="9.13"
            x="768.11"
            y="151.69"
          />
          <rect
            id="line-2"
            class="bahrain-5"
            height="355.94"
            width="9.13"
            x="745.25"
            y="183.12"
          />
          <rect
            id="line-3"
            class="bahrain-5"
            height="411.46"
            width="9.13"
            x="722.98"
            y="183.12"
          />
          <rect
            id="line-4"
            class="bahrain-5"
            height="301.51"
            width="21.3"
            x="555.66"
            y="148.98"
          />
          <rect
            id="line-5"
            class="bahrain-5"
            height="145.79"
            width="3.44"
            x="865.2"
            y="471.39"
          />
          <rect
            id="line-6"
            class="bahrain-5"
            height="187.76"
            width="3.44"
            x="850.99"
            y="471.39"
          />
          <rect
            id="line-7"
            class="bahrain-5"
            height="240.76"
            width="7.33"
            x="622.15"
            y="610.64"
          />
          <rect
            id="line-8"
            class="bahrain-5"
            height="314.13"
            width="7.33"
            x="600.53"
            y="545.97"
          />
          <rect
            id="line-9"
            class="bahrain-5"
            height="301.51"
            width="10.65"
            x="361.89"
          />
          <rect
            id="line-10"
            class="bahrain-3"
            height="301.51"
            width="6.4"
            x="172.17"
            y="189.66"
          />
          <rect
            id="line-11"
            class="bahrain-3"
            height="301.51"
            width="6.4"
            x="149.46"
            y="238.37"
          />
          <rect
            id="line-12"
            class="bahrain-3"
            height="301.51"
            width="6.4"
            x="190.13"
            y="234.29"
          />
          <rect
            id="line-13"
            class="bahrain-3"
            height="386.61"
            width="11.08"
            x="63.05"
            y="509.73"
          />
          <rect
            id="line-14"
            class="bahrain-3"
            height="386.61"
            width="11.08"
            x="22.74"
            y="221.72"
          />
          <rect
            id="line-15"
            class="bahrain-5"
            height="678.67"
            width="5.32"
            x="459.45"
            y="132.26"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "BahrainFlag",
};
</script>

<style lang="scss" scoped>
@import "flag-animations";

.bahrain-1 {
  fill: none;
}

.bahrain-2 {
  clip-path: url(#clip-path);
}

.bahrain-3 {
  fill: #cd1126;
}

.bahrain-4 {
  fill: #fefdfe;
}

.bahrain-5 {
  fill: #fff;
}

svg {
  #Layer_2 {
    #Bahrain {
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

      #line-5,
      #line-17 {
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
      #line-15 {
        animation: topToBottom 2.75s infinite linear;
      }
    }
  }
}
</style>
