<template>
  <div class="map-container fill-height fill-width">
    <l-map :center="center" :zoom="zoom" class="fill-width map">
      <l-tile-layer :attribution="attribution" :url="url" />
      <l-geo-json :geojson="geojson" />
    </l-map>
  </div>
</template>

<script>
import {latLng} from 'leaflet'
import {LGeoJson, LMap, LTileLayer} from 'vue2-leaflet'

export default {
  name: "geo-map",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  props: {
    geojsonFileName: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    loading: false,
    show: true,
    enableTooltip: true,
    zoom: 14,
    center: [48, -1.219482],
    geojson: null,
    fillColor: "#e4ce7f",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    marker: latLng(47.41322, -1.219482),
  }),
  async created() {
    this.geojson = require(`@/helpers/gjson_data/${this.geojsonFileName}`);

    const center = [
      this.geojson.features[0].geometry.coordinates[0][0],
      this.geojson.features[0].geometry.coordinates[0][1],
    ];
    this.center = latLng(center[1], center[0]);
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  .map {
    min-height: 500px;
    border-radius: 10px;
    box-shadow: $base-shadow;
  }
}
</style>
