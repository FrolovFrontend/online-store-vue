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
  },
});
