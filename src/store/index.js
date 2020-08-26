import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_BASE_URL } from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: [],
  },
  // мутации должны быть синхронные (обращаться к API нельзя)
  mutations: {
    addProductToCart(state, payload) {
      // переданные данные из метода addToCart() компонента ProductPage
      // используется в обработчике мутации для изменения стейта хранилища
      //
      // в payload объект переданный в методе:
      // { productId: this.product.id, amount: this.productAmount }
      //
      const item = state.cartProducts.find(
        (item) => item.productId === payload.productId
      );

      // проверка на наличие товара в корзине(хранилище)
      // если товар уже есть добавляется его количество
      // иначе добавляется новый объект в состояние
      //
      if (item) {
        item.amount += payload.amount;
      } else {
        state.cartProducts.push({
          productId: payload.productId,
          amount: payload.amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(
        (item) => item.productId === productId
      );

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.productId !== productId
      );
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
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
          product: {
            ...product,
            image: product.image.file.url,
          },
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
    loadCart(context) {
      // контекст содержит теже методы что и глобальный экземпляр хранилища
      axios
        .get(API_BASE_URL + "/api/baskets", {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem("userAccessKey", response.data.user.accessKey);
            context.commit("updateUserAccessKey", response.data.user.accessKey);
          }
          context.commit("updateCartProductsData", response.data.items);
          context.commit("syncCartProducts");
        });
    },
  },
});
