import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Constructors from "@/views/Constructors";
import ConstructorDetails from "@/views/Constructor-details";
import PageNotFound from "@/views/Page-not-found";

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
    document.title =
      `${to.params.id ? to.params.id : to.meta.title} | ${DEFAULT_TITLE}` ||
      DEFAULT_TITLE;
  });
});

export default router;
