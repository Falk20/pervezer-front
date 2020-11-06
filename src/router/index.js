import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Client from "../views/Client.vue";
import ClientDetails from "../views/ClientDetails.vue";
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
        path: "profiles",
        component: () => import("@/components/ProfilesTable"),
      },
      {
        path: "guest",
      },
      {
        path: "discounts",
        component: () => import("@/components/DiscountsTable"),
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
    path: "/clientdetails",
    name: "ClientDetails",
    component: ClientDetails,
    beforeEnter: ifAuthenticated,
    children:[
      {
        path: "",
        component: () => import("@/components/Client/ClientSettings"),
      },
      {
        path: "offices",
        component: () => import("@/components/Client/ClientOffices"),
      },
      {
        path: "garage",
        component: () => import("@/components/Client/ClientGarage"),
      },
      {
        path: "cart",
        component: () => import("@/components/Client/ClientCart"),
      },
      {
        path: "addresses",
        component: () => import("@/components/Client/ClientAddresses"),
      },
      {
        path: "rekvizites",
        component: () => import("@/components/Client/ClientRekvizites"),
      },
      
      {
        path: "contracts",
        component: () => import("@/components/Client/ClientContracts"),
      },
    ]
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
