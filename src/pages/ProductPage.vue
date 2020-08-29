<template>
  <div>
    <main class="content preloader container" v-if="productLoading">
      <base-preloader />
    </main>
    <main class="content product__error container" v-else-if="!productData">
      <p>Не удалось загрузить товар</p>
      <button class="button button--primery" @click.prevent="loadProduct">Повторить загрузку</button>
    </main>
    <main class="content container" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <!-- первый способ роута -->
            <!-- предпочтительный -->
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">Каталог</router-link>
          </li>
          <li class="breadcrumbs__item">
            <!-- второй способ роута -->
            <!-- если нужно сделать переход в каком нибудь методе компонента -->
            <a
              class="breadcrumbs__link"
              @click.prevent="$router.push({name: 'main'})"
            >{{ category.title }}</a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">{{ product.title }}</a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="product.image.file.url" :alt="product.title" />
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
              <b class="item__price">{{ totalPrice | numberFormat }} ₽</b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li
                    class="colors__item"
                    v-for="color in product.colors"
                    :key="color.id + color.code"
                  >
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="colors"
                        :value="color.id"
                      />
                      <span class="colors__value" :style="{ backgroundColor: color.code }"></span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <button
                    type="button"
                    aria-label="Убрать один товар"
                    @click.prevent="productAmount--"
                    :disabled="productAmount < 1"
                  >
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus" />
                    </svg>
                  </button>

                  <input type="text" v-model.number="productAmount" />

                  <button
                    type="button"
                    aria-label="Добавить один товар"
                    @click.prevent="productAmount++"
                  >
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus" />
                    </svg>
                  </button>
                </div>

                <button
                  class="button button--primery"
                  type="submit"
                  :disabled="productAddSending"
                >{{ buttonText }}</button>
              </div>

              <div v-show="productAdded" class="product-added">
                <div class="product-added__container">
                  <span class="product-added__text">Товар добавлен в корзину</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        <product-page-tabs />
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import BasePreloader from "@/components/BasePreloader.vue";
import ProductPageTabs from "@/components/ProductPageTabs/ProductPageTabs.vue";
import numberFormat from "@/helpers/filters/numberFormat";
import { API_BASE_URL } from "@/config";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false,
    };
  },
  components: { ProductPageTabs, BasePreloader },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
    totalPrice() {
      return this.product.price * this.productAmount;
    },
    buttonText() {
      return this.productAddSending ? "Добавление" : "В корзину";
    },
  },
  methods: {
    ...mapActions(["addProductToCart"]),

    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount,
      }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      this.productAdded = false;

      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + "/api/products/" + this.$route.params.id)
          .then((response) => (this.productData = response.data))
          .catch(() => (this.productLoadingFailed = true))
          .then(() => (this.productLoading = false));
      }, 500);
    },
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.preloader,
.product__error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.product__error {
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
.form {
  position: relative;
}
.product-added {
  position: absolute;
  bottom: -36px;
  &__text {
    position: relative;
    padding-left: 32px;

    &::before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -36 509.248 509' width='24px'%3E%3Cpath d='m171.902344 438.074219-171.902344-171.902344 100.625-100.609375 71.277344 71.296875 236.722656-236.734375 100.621094 100.621094zm0 0' fill='%23addb31'/%3E%3C/svg%3E")
        no-repeat;
      background-size: contain;
      left: 0;
      top: -2px;
    }
  }
}
</style>