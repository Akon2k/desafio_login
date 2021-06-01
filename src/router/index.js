import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "All",
    redirect: { name: "Login" },
  },

  {
    path: "/",
    name: "Index",
    redirect: { name: "Login" },
  },

  {
    path: "/home",
    name: "Home",
    component: Home,
  },

  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const logeado = store.getters.logeado;

  switch (to.name) {
    case "Home":
      if (!logeado) next({ name: "Login" });
      else next();
      break;
    case "Login":
      if (logeado) next({ name: "Home" });
      else next();
      break;
    default:
      next();
      break;
  }
});

export default router;