import { createRouter, createWebHistory } from "vue-router";
import Search from "../components/Search.vue"
import Profile from "../components/Profile.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "search",
      component: Search,
    }, {
      path: "/profile/:platform/:gamertag",
      name: "profile",
      component: Profile,
    }
  ],
});

export default router;
