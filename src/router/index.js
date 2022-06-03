import { createRouter, createWebHistory } from "vue-router";
import Employee from "../views/Employee.vue";
import Cash from "../views/cash/Cash.vue";
import Vendor from "../views/cash/Vendor.vue";
import Process from "../views/cash/Process.vue";
import Transaction from "../views/cash/Transaction.vue";

const routes = [
  { path: "", redirect: "/cash" },
  {
    path: "/overview",
    component: Employee,
  },
  {
    path: "/vendor",
    component: Vendor,
  },
  {
    path: "/cash",
    component: Cash,
    children: [
      { path: "", redirect: "/cash/process" },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "process",
        component: Process,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "transaction",
        component: Transaction,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
