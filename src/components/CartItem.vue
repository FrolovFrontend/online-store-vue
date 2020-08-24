<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        srcset="img/phone-square-3@2x.jpg 2x"
        :alt="item.product.title"
      />
    </div>
    <router-link class="product__link" :to="{name: 'product', params: {id: item.productId}}">
      <h3 class="product__title">{{ item.product.title }}</h3>
    </router-link>
    <span class="product__code">Артикул: {{ item.productId }}</span>
    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click.prevent="amount--"
        :disabled="amount < 2"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus" />
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count" />

      <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus" />
        </svg>
      </button>
    </div>

    <b class="product__price">{{ totalPrice | numberFormat }} ₽</b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close" />
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "@/helpers/filters/numberFormat";
import { mapMutations } from "vuex";

export default {
  props: ["item"],
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit("updateCartProductAmount", {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
    totalPrice() {
      return this.item.amount * this.item.product.price;
    },
  },
  methods: {
    ...mapMutations({
      deleteProduct: "deleteCartProduct",
    }),
  },
};
</script>

<style>
.product__link {
  color: rgba(0, 0, 0, 1);
}
.product__link:hover {
  color: rgba(0, 0, 0, 0.5);
}
</style>