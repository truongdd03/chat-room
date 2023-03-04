import { createApp } from "vue";
import { Store, createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

import "bulma/css/bulma.css";
import "./assets/main.css";

import Notifications from "@kyvg/vue3-notification";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEllipsis,
  faPaperPlane,
  faPlusCircle,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { StoreData } from "./types/StoreData";

const icons = [faSearch, faEllipsis, faPaperPlane, faPlusCircle, faTimes];

icons.forEach((icon) => library.add(icon));

// Create a new store instance.
const store: Store<StoreData> = createStore({
  state() {
    return {
      isConnected: false,
      messages: {},
      groupById: {},
    };
  },
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Notifications);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
