<template>
  <svg viewBox="0 0 1016.62 607.6" xmlns="http://www.w3.org/2000/svg">
    <g id="lines" data-name="Layer 2">
      <g id="Austria">
        <rect class="austria-1" height="607.6" width="1016.62" />
        <polygon
          class="austria-2"
          points="1016.62 150.38 0 195 0 0 1016.62 0 1016.62 150.38"
        />
        <polygon
          class="austria-2"
          points="1016.62 607.6 0 607.6 0 457.22 1016.62 411 1016.62 607.6"
        />
        <rect
          id="line-1"
          class="austria-2"
          height="211.44"
          width="7.1"
          x="136.92"
          y="199.56"
        />
        <rect
          id="line-2"
          class="austria-2"
          height="98.58"
          width="7.1"
          x="160.24"
          y="219.16"
        />
        <rect
          id="line-3"
          class="austria-3"
          height="175.54"
          width="7.73"
          x="314.13"
          y="68.74"
        />
        <rect
          id="line-4"
          class="austria-3"
          height="307.17"
          width="14.56"
          x="713.62"
          y="7.91"
        />
        <rect
          id="line-5"
          class="austria-3"
          height="307.17"
          width="7.28"
          x="692.55"
          y="205.74"
        />
        <rect
          id="line-6"
          class="austria-3"
          height="220.48"
          width="7.28"
          x="905.41"
          y="289.22"
        />
        <rect
          id="line-7"
          class="austria-3"
          height="445.83"
          width="7.28"
          x="528.69"
          y="55.56"
        />
        <rect
          id="line-8"
          class="austria-4"
          height="175.54"
          width="7.73"
          x="59.21"
          y="24.02"
        />
        <rect
          id="line-9"
          class="austria-4"
          height="261.98"
          width="7.73"
          x="217.41"
          y="295.04"
        />
        <rect
          id="line-10"
          class="austria-4"
          height="261.98"
          width="7.73"
          x="236.87"
          y="228.34"
        />
        <rect
          id="line-11"
          class="austria-4"
          height="261.98"
          width="7.73"
          x="454.18"
          y="59.35"
        />
        <rect
          id="line-12"
          class="austria-4"
          height="261.98"
          width="7.73"
          x="856.28"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "AustriaFlag",
};
</script>

<style lang="scss" scoped>
@import "flag-animations";

.austria-1 {
  fill: #f2f2f2;
}

.austria-2 {
  fill: #c60b1e;
}

.austria-3 {
  fill: #b50b24;
}

.austria-4 {
  fill: #eaeaea;
}

svg {
  #lines {
    #Austria {
      #line-1,
      #line-2,
      #line-5,
      #line-10,
      #line-11 {
        animation: topToBottom 4s infinite linear;
      }

      #line-3,
      #line-4,
      #line-12 {
        animation: bottomToTop 3.5s infinite linear;
      }

      #line-6,
      #line-7,
      #line-9 {
        animation: bottomToTop 3s infinite linear;
      }

      #line-8 {
        animation: topToBottom 5s infinite linear;
      }
    }
  }
}
</style>
