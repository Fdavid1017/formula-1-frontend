import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import FlagIcon from "vue-flag-icon";
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

//Font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faLaptop } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://127.0.0.1:5000/api/";
Vue.use(VueAxios, axios);
Vue.use(FlagIcon);

library.add(
  faLaptop,
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
  faYoutubeSquare,
  faChevronLeft
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
