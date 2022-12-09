import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Toasted from "@meforma/vue-toaster";


const app = createApp(App);


app.use(createPinia());
app.use(router);

app.use(Toasted).mount("#app");
