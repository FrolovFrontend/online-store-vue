<template>
  <div>
    <main class="content container preloader" v-if="$store.state.loading">
      <base-preloader />
    </main>
    <main class="content cart__error container" v-else-if="$store.state.cartLoadingFailed">
      <p>Не удалось загрузить корзину</p>
      <button
        class="button button--primery"
        @click.prevent="$store.dispatch('loadCart')"
      >Повторить загрузку</button>
    </main>
    <main class="content container" v-else>
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
        <span
          class="content__info"
          v-if="products.length > 0"
        >{{ products.length }} {{ declOfProduct }}</span>
        <div v-else class="content-info">
          <span class="content__info">Чтобы оформить заказ, в корзине должен быть хотя бы 1 товар</span>
          <router-link
            tag="button"
            :to="{name: 'main'}"
            class="content-info__button button button--primery"
          >Перейти в каталог</router-link>
        </div>
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

            <router-link
              tag="button"
              :to="{name: 'order'}"
              class="cart__button button button--primery"
              type="submit"
              :disabled="products.length === 0"
            >Оформить заказ</router-link>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import numberFormat from "@/helpers/filters/numberFormat";
import declOfNumber from "@/helpers/declOfNumber";
import { mapGetters } from "vuex";
import CartItem from "@/components/CartItem.vue";
import BasePreloader from "@/components/BasePreloader.vue";
import { DECLENSIONS_PRODUCT } from "@/helpers/constans";

export default {
  filters: { numberFormat },
  components: { CartItem, BasePreloader },
  computed: {
    // получаем геттеры из стора и записываем их результат в вычисляемое свойство в виде объекта
    // где ключ - вычисляемое свойство, а значение - название геттера
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
    declOfProduct() {
      const quantity = this.products.length;

      return declOfNumber(quantity, DECLENSIONS_PRODUCT);
    },
  },
};
</script>

<style lang="scss">
.content-info {
  display: flex;
  flex-direction: column;

  &__button {
    margin-top: 24px;
    max-width: 300px;

    &:not(:disabled):hover {
      color: #222;
    }
  }
}
.cart__error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.cart__error {
  p {
    color: rgb(255, 0, 0);
  }

  .button--primery {
    padding-left: 40px;
    padding-right: 40px;
    &:hover {
      color: black;
    }
  }
}
</style>