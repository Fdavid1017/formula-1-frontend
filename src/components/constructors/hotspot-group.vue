<template>
  <div class="">
    <hotspot
      v-for="(item, index) in items"
      :key="index"
      v-model="open[index]"
      :color="item.color"
      :left="item.left"
      :secondary-color="item.secondaryColor"
      :text="item.text"
      :title="item.title"
      :top="item.top"
      :position="item.position"
      @input="itemStateChange(index)"
    />
  </div>
</template>

<script>
import Hotspot from "@/components/constructors/hotspot";

export default {
  name: "hotspot-group",
  components: { Hotspot },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    allowMultipleOpen: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data: () => ({
    open: [],
  }),
  mounted() {
    this.items.forEach(() => {
      this.open.push(false);
    });
  },
  methods: {
    itemStateChange(index) {
      if (this.allowMultipleOpen) {
        return;
      }

      for (let i = 0; i < this.open.length; i++) {
        if (this.open[i] === true && i !== index) {
          this.open[i] = false;
        }
      }
    },
  },
};
</script>

<style scoped></style>
