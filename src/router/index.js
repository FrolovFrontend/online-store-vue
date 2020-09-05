import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import OrderPage from "@/pages/OrderPage";
import OrderInfoPage from "../pages/OrderInfoPage";

Vue.use(VueRouter);

const routes = [
  {
    name: "main",
    component: MainPage,
    path: "/",
  },
  {
    name: "cart",
    component: CartPage,
    path: "/cart",
  },
  {
    name: "product",
    component: ProductPage,
    path: "/product/:id",
  },
  {
    name: "order",
    component: OrderPage,
    path: "/order",
  },
  {
    name: "orderInfo",
    component: OrderInfoPage,
    path: "/order/:id",
  },
  {
    name: "notFound",
    component: NotFoundPage,
    path: "*",
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
