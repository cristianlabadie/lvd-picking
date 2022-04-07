import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/home",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      // {
      //   path: "",
      //   redirect: "/tabs/home",
      // },
      {
        name: "home",
        path: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        name: "detalleEscaneo",
        path: "detalleEscaneo",
        component: () => import("@/views/pages/DetalleEscaneo.vue"),
      },
      {
        name: "exito",
        path: "exito",
        component: () => import("@/views/pages/Exito.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
