import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import PrimeVue from "primevue/config";

import "primevue/resources/themes/vela-green/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex.spaces,grid

import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Calendar from "primevue/calendar";
import SelectButton from "primevue/selectbutton";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import InputSwitch from "primevue/inputswitch";
import Chart from "primevue/chart";

const app = createApp(App);
app.use(store);
app.use(router);

app.use(PrimeVue);
app.component("Button", Button);
app.component("Toolbar", Toolbar);
app.component("Calendar", Calendar);
app.component("SelectButton", SelectButton);
app.component("Message", Message);
app.component("ProgressSpinner", ProgressSpinner);
app.component("InputSwitch", InputSwitch);
app.component("Chart", Chart);

app.mount("#app");
