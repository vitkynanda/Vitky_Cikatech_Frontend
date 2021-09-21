import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const options = {
  confirmButtonColo: "r#04c35c",
};
const app = createApp(App);
app.use(VueSweetalert2, options);

app.use(router);
app.mount("#app");
