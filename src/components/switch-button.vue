<template>
  <div class="d-flex align-center">
    <div :class="{ 'font-weight-bold': !selectValue }" class="value mr-4">
      {{ leftValue }}
    </div>
    <v-switch
      v-model="selectValue"
      class="ma-0"
      color="primary"
      hide-details
      inset
    ></v-switch>
    <div :class="{ 'font-weight-bold': selectValue }" class="value">
      {{ rightValue }}
    </div>
  </div>
</template>

<script>
export default {
  name: "switch-button",
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
    leftValue: {
      type: String,
      default: "",
    },
    rightValue: {
      type: String,
      default: "",
    },
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.value {
  font-size: 16px;
}
</style>
