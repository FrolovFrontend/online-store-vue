import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_BASE_URL } from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: null,
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoadingFailed: false,
    orderInfo: null,
    loading: false,
    error: false,
  },
  // мутации должны быть синхронные (обращаться к API нельзя)
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    resetProducts(state) {
      state.products = null;
    },
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
    setErrorTrue(state) {
      state.error = true;
    },
    setErrorFalse(state) {
      state.error = false;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(
        (item) => item.productId === productId
      );

      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return { productId: item.product.id, amount: item.quantity };
      });
    },
  },
  getters: {
    // геттер для получения подробной информации о товаре по его id
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(
          (p) => p.product.id === item.productId
        ).product;

        return {
          ...item,
          product: { ...product, image: product.image.file.url },
        };
      });
    },

    // геттер для получение общей суммы товаров в корзине
    // в getters объект всех геттеров, то есть можно обратится
    // к инфе уже созданного геттера, что бы не дублировать код
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0
      );
    },
  },
  // actions в отличае от мутаций могут выполнять асинхронные действия
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(API_BASE_URL + "/api/orders/" + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit("updateOrderInfo", response.data);
        });
    },
    loadProducts(context, params) {
      context.commit("resetProducts");
      context.commit("setLoadingTrue");
      context.commit("setErrorFalse");

      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        return axios
          .get(API_BASE_URL + "/api/products", { params: params })
          .then((response) => {
            context.commit("setProducts", response.data);
          })
          .catch(() => {
            context.commit("setErrorTrue");
          })
          .then(() => {
            context.commit("setLoadingFalse");
          });
      }, 500);
    },
    loadCart(context) {
      // контекст содержит теже методы что и глобальный экземпляр хранилища
      context.commit("setLoadingTrue");
      context.commit("setErrorFalse");

      clearTimeout(this.loadCartTimer);
      this.loadCartTimer = setTimeout(() => {
        return axios
          .get(API_BASE_URL + "/api/baskets", {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem(
                "userAccessKey",
                response.data.user.accessKey
              );
              context.commit(
                "updateUserAccessKey",
                response.data.user.accessKey
              );
            }
            context.commit("updateCartProductsData", response.data.items);
            context.commit("syncCartProducts");
          })
          .catch(() => {
            context.commit("setErrorTrue");
          })
          .then(() => {
            context.commit("setLoadingFalse");
          });
      }, 500);
    },
    addProductToCart(context, { productId, amount }) {
      return new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        return axios
          .post(
            API_BASE_URL + "/api/baskets/products",
            { productId: productId, quantity: amount },
            { params: { userAccessKey: context.state.userAccessKey } }
          )
          .then((response) => {
            context.commit("updateCartProductsData", response.data.items);
            context.commit("syncCartProducts");
          });
      });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit("updateCartProductAmount", { productId, amount });

      if (amount < 1) {
        return;
      }

      return axios
        .put(
          API_BASE_URL + "/api/baskets/products",
          { productId: productId, quantity: amount },
          { params: { userAccessKey: context.state.userAccessKey } }
        )
        .then((response) => {
          context.commit("updateCartProductsData", response.data.items);
        })
        .catch(() => {
          context.commit("syncCartProducts");
        });
    },
    deleteCartProduct(context, { productId }) {
      return axios
        .delete(API_BASE_URL + "/api/baskets/products", {
          params: { userAccessKey: context.state.userAccessKey },
          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit("updateCartProductsData", response.data.items);
          context.commit("syncCartProducts");
        });
    },
  },
});
