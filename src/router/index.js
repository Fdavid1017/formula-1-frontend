import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Constructors from "@/views/Constructors";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/constructors",
    name: "Constructors",
    component: Constructors,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
