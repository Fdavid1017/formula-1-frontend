<template>
  <div class="f1-panel fill-width py-2 ps-2">
    <div class="panel-inside">
      <div class="panel-content pa-1">
        <div class="fill-width d-flex align-center logo-container mb-2">
          <img class="logo me-3" alt="logo" src="@/assets/logo-white.svg" />
          {{ sessionName }}
        </div>

        <div
            v-for="(option,index) in options"
            class="option-item"
            :key="option"
            :class="{'font-weight-bold':activeItem===index}"
            @click="$emit('itemSelect',index)"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-side-panel',
  props: {
    sessionName: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    activeItem: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.f1-panel {
  $panel-border-radius: 15px 0 0 15px;

  color: white;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: $panel-border-radius;

  .panel-inside {
    border-radius: $panel-border-radius;
    background-color: #1c1f26;
    padding: 5px 0 5px 5px;

    .panel-content {
      border-radius: $panel-border-radius;
      border: 3px solid $f1-red;
      border-right: none;

      .logo-container {
        border-bottom: 1px solid #898a8e;
        font-size: 30px;
        font-weight: 700;
        font-family: Formula1;

        .logo {
          height: 100px;
          margin-top: -10%;
          margin-bottom: -10%;
        }
      }

      .option-item {
        font-size: 20px;
        padding: 2px 0;
        cursor: pointer;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
</style>
