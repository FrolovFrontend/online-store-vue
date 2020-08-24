<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Корзина</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">{{ products.length }} {{ declOfProduct }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem :item="item" v-for="item in products" :key="item.productId" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого:
            <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from "@/helpers/filters/numberFormat";
import declOfNumber from "@/helpers/declOfNumber";
import { mapGetters } from "vuex";
import CartItem from "@/components/CartItem.vue";

const DECLENSIONS = ["товар", "товара", "товаров"];

export default {
  filters: { numberFormat },
  components: { CartItem },
  computed: {
    // получаем геттеры из стора и записываем их результат в вычисляемое свойство в виде объекта
    // где ключ - вычисляемое свойство, а значение - название геттера
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
    declOfProduct() {
      const quantity = this.products.length;

      return declOfNumber(quantity, DECLENSIONS);
    },
  },
};
</script>