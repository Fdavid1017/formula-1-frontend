import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Constructors from "@/views/Constructors";
import ConstructorDetails from "@/views/Constructor-details";
import PageNotFound from "@/views/Page-not-found";
import Drivers from "@/views/Drivers";
import News from "@/views/News";
import DriverDetails from "@/views/Driver-details";
import Schedule from "@/views/Schedule";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/constructors",
    name: "Constructors",
    component: Constructors,
    meta: {
      title: "Constructors",
    },
  },
  {
    path: "/constructors/:id",
    name: "ConstructorDetails",
    component: ConstructorDetails,
    meta: {
      title: "Constructor",
    },
  },
  {
    path: "/drivers",
    name: "Drivers",
    component: Drivers,
    meta: {
      title: "Drivers",
    },
  },
  {
    path: "/drivers/:id",
    name: "DriverDetails",
    component: DriverDetails,
    meta: {
      title: "Driver",
    },
  },
  {
    path: "/news",
    name: "News",
    component: News,
    meta: {
      title: "News",
    },
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
    meta: {
      title: "Schedule",
    },
  },
  {
    path: "/404",
    alias: "*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      title: "404",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export const DEFAULT_TITLE = "Formula-1";
router.afterEach((to) => {
  Vue.nextTick(() => {
    let title = `${to.meta.title} | ${DEFAULT_TITLE}`;

    if (to.params.id) {
      const arr = to.params.id.replaceAll("_", " ").split(" ");

      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }

      const capitalized = arr.join(" ");
      title = `${capitalized} | ${DEFAULT_TITLE}`;
    }

    document.title = title;
  });
});

export default router;
