import { Register } from "./Register";
import { Chat } from "./Chat";

const routes = [
  { path: "/", component: Register, name: "register" },
  { path: "/chat", component: Chat, name: "chat", params: true }
];

const router = new VueRouter({
  routes
});

new Vue({
  el: "#app",
  router: router
});
