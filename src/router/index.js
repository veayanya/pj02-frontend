import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ToolView from "../views/ToolView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/tool/:key", name: "tool", component: ToolView, props: true },
  ],
});

export default router;
