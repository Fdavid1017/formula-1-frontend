<template>
  <svg viewBox="0 0 1016.62 621.64" xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Japan">
        <rect class="japan-1" height="621.64" width="1016.62" />
        <circle class="japan-2" cx="508.31" cy="310.82" r="194.83" />
        <rect
          id="line-1"
          class="japan-2"
          height="275.56"
          width="4"
          x="55.62"
          y="59.99"
        />
        <rect
          id="line-2"
          class="japan-2"
          height="360.95"
          width="8"
          x="76.95"
          y="112.37"
        />
        <rect
          id="line-3"
          class="japan-2"
          height="287.11"
          width="5.33"
          x="94.73"
          y="42.21"
        />
        <rect
          id="line-4"
          class="japan-2"
          height="482.67"
          width="7.11"
          x="856.51"
          y="125.77"
        />
        <rect
          id="line-5"
          class="japan-2"
          height="341.33"
          width="7.11"
          x="821.84"
          y="42.21"
        />
        <rect
          id="line-6"
          class="japan-2"
          height="96.89"
          width="3.56"
          x="622.73"
          y="32.43"
        />
        <rect
          id="line-7"
          class="japan-2"
          height="536.89"
          width="3.56"
          x="277.84"
          y="32.43"
        />
        <rect
          id="line-8"
          class="japan-2"
          height="110.22"
          width="4.44"
          x="147.17"
          y="459.1"
        />
        <rect
          id="line-9"
          class="japan-2"
          height="96.89"
          width="8"
          x="965.84"
          y="28.88"
        />
        <rect
          id="line-10"
          class="japan-2"
          height="177.43"
          width="8.89"
          x="297.39"
          y="32.43"
        />
        <rect
          id="line-11"
          class="japan-1"
          height="216"
          width="7.11"
          x="478.73"
          y="167.55"
        />
        <rect
          id="line-12"
          class="japan-1"
          height="119.11"
          width="5.33"
          x="572.95"
          y="285.77"
        />
        <rect
          id="line-13"
          class="japan-1"
          height="165.68"
          width="8"
          x="556.06"
          y="209.87"
        />
        <rect
          id="line-14"
          class="japan-1"
          height="140.43"
          width="10.67"
          x="460.06"
          y="318.67"
        />
        <rect
          id="line-15"
          class="japan-1"
          height="96.34"
          width="7.11"
          x="363.17"
          y="209.87"
        />
        <rect
          id="line-16"
          class="japan-1"
          height="59.21"
          width="6.22"
          x="590.73"
          y="150.66"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "JapanFlag",
};
</script>

<style lang="scss" scoped>
@import "flag-animations";

.japan-1 {
  fill: #f2f2f2;
}

.japan-2 {
  fill: #bb002d;
}

svg {
  #Layer_2 {
    #Japan {
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
