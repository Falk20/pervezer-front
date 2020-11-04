import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Client from "../views/Client.vue";
import store from "../store";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.state.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/client",
    name: "Client",
    component: Client,

    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        component: () => import("@/components/ClientsTable"),
      },
      {
        path: "profile",
      },
      {
        path: "guest",
      },
      {
        path: "sale",
      },
      {
        path: "status",
      },
      {
        path: "franchisee",
      },
      {
        path: "sms",
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: ifNotAuthenticated,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
