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
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Chart from "primevue/chart";

const app = createApp(App);
app.use(store);
app.use(router);

app.use(PrimeVue);
app.component("exnaton-button", Button);
app.component("exnaton-toolbar", Toolbar);
app.component("exnaton-calendar", Calendar);
app.component("exnaton-select-button", SelectButton);
app.component("exnaton-message", Message);
app.component("exnaton-progress-spinner", ProgressSpinner);
app.component("exnaton-input-switch", InputSwitch);
app.component("exnaton-card", Card);
app.component("exnaton-input-text", InputText);
app.component("exnaton-avatar", Avatar);
app.component("exnaton-chart", Chart);

app.mount("#app");
