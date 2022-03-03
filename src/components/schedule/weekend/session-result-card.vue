<template>
  <router-link to="/">
    <div :class="{ 'result-podium': position <= 3 }" class="result-card">
      <div class="corner-image-container">
        <img
          class="corner-image"
          src="@/assets/images/session-result-card-corner.svg"
        />

        <div class="position-text">{{ position }}{{ positionTextSuffix }}</div>
      </div>

      <div class="text-container d-flex align-center justify-space-between">
        <div>
          <div class="driver-name">Valteri Bottas</div>
          <div class="constructor-name mt-n4">Mercedes</div>
        </div>

        <div class="points">265<span>pt</span></div>
      </div>

      <div class="driver-image-container">
        <img
          alt="Bottas"
          class="driver-image"
          src="@/assets/images/drivers/bottas.png"
        />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "session-result-card",
  data: () => ({
    position: 1,
  }),
  computed: {
    positionTextSuffix() {
      const j = this.position % 10;
      const k = this.position % 100;
      if (j === 1 && k !== 11) {
        return "st";
      }
      if (j === 2 && k !== 12) {
        return "nd";
      }
      if (j === 3 && k !== 13) {
        return "rd";
      }
      return "th";
    },
  },
};
</script>

<style lang="scss" scoped>
.result-card {
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  height: 150px;
  box-shadow: $base-shadow;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(1.05);

    .corner-image-container {
      left: -30px;
    }

    .driver-image-container {
      height: 145%;
    }
  }

  .corner-image-container {
    position: absolute;
    top: -20px;
    left: -20px;
    transition: all 0.3s ease-out;
    transition-delay: 0.1s;

    .corner-image {
    }

    .position-text {
      color: white;
      font-weight: bold;
      font-size: 40px;
      position: absolute;
      top: 12px;
      left: 15px;
    }
  }

  .text-container {
    height: 100%;
    padding: 0 20% 0 12%;
    min-height: 100px;
    color: $dark-blue;

    .driver-name {
      font-weight: bold;
      font-size: 45px;
    }

    .constructor-name {
      font-size: 25px;
    }

    .points {
      font-size: 50px;
      font-weight: bold;

      span {
        font-size: 30px;
      }
    }
  }

  .driver-image-container {
    height: 130%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: end;
    align-items: end;
    overflow-x: hidden;
    border-radius: 10px;
    pointer-events: none;
    transition: all 0.3s ease-out;
    transition-delay: 0.1s;

    .driver-image {
      height: 100%;
      margin-right: -50px;
    }
  }
}

.result-podium {
  background-color: $f1-red !important;

  .text-container {
    color: white !important;
  }
}
</style>
