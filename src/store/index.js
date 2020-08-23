import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 1,
        amount: 2,
      },
    ],
  },
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
  },
  getters: {
    // геттер для получения подробной информации о товаре по его id
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        return {
          ...item,
          product: products.find((p) => p.id === item.productId),
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
});
