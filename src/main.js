import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//radio

import transactionType from "@/js/transactionType";
import entityOnModified from "@/js/entityOnModified";
import formatData from "@/js/formatData/formatData";

let app = createApp(App);
app.config.globalProperties.transactionType = transactionType;
app.config.globalProperties.entityModified = entityOnModified;
app.config.globalProperties.formatData = formatData;

app.use(store).use(router).mount("#app");
