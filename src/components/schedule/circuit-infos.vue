<template>
  <v-container>
    <div class="d-flex align-center">
      <div class="flag">flag</div>
      <div class="">
        <div class="">gp name</div>
        <div class="">circuit name</div>
      </div>
    </div>

    <v-row>
      <v-col cols="8"> circuit kép</v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="6">infos 1</v-col>
          <v-col cols="6">infos 2</v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="">full map</div>
  </v-container>
</template>

<script>
export default {
  name: "circuit-infos",
  props: {
    circuit: {
      type: Object,
      default() {
        return {
          Location: {
            country: "",
            lat: "",
            locality: "",
            long: ""
          },
          circuitId: "",
          circuitName: "",
          details: {
            circuit_id: "",
            first_gp: 2020,
            gjson_map: "",
            image_name: "",
            length: 0,
            map: {
              bbox: [],
              features: [
                {
                  bbox: [],
                  geometry: {
                    coordinates: [],
                    type: ""
                  },
                  properties: {
                    Location: "",
                    Name: "",
                    altitude: 0,
                    firstgp: 2020,
                    id: "",
                    length: 0,
                    opened: 0
                  },
                  type: ""
                }
              ],
              name: "",
              type: ""
            },
            number_of_laps: 0,
            primary_color: "",
            race_distance: 0,
            secondary: "",
            tertiary: ""
          },
          url: ""
        };
      }
    }
  }
};
</script>

<style scoped></style>
