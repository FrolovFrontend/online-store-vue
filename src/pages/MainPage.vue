<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{ countProducts }} {{ declOfProduct }}</span>
    </div>
    <div class="content__catalog">
      <product-filter v-bind.sync="filters" />
      <section class="catalog">
        <base-preloader v-if="$store.state.loading" />
        <div class="catalog__error" v-if="$store.state.error">
          <p>Произошла ошибка при загрузке товаров</p>
          <button class="button button--primery" @click.prevent="loadProducts">Повторить загрузку</button>
        </div>
        <product-list :products="products" />
        <base-pagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from "@/components/ProductList/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductList/ProductFilter.vue";
import BasePreloader from "@/components/BasePreloader.vue";
import declOfNumber from "@/helpers/declOfNumber";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { DECLENSIONS_PRODUCT } from "@/helpers/constans";

export default {
  components: { ProductList, BasePagination, ProductFilter, BasePreloader },
  data() {
    return {
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0,
      },

      page: 1,
      productsPerPage: 6,
    };
  },
  computed: {
    products() {
      const data = this.$store.state.products;

      return data
        ? data.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url,
            };
          })
        : [];
    },
    countProducts() {
      return this.$store.state.products
        ? this.$store.state.products.pagination.total
        : 0;
    },
    declOfProduct() {
      const quantity = this.countProducts;

      return declOfNumber(quantity, DECLENSIONS_PRODUCT);
    },
  },
  methods: {
    loadProducts() {
      const params = {
        page: this.page,
        limit: this.productsPerPage,
        categoryId: this.filters.categoryId,
        colorId: this.filters.colorId,
        minPrice: this.filters.priceFrom,
        maxPrice: this.filters.priceTo,
      };

      this.$store.dispatch("loadProducts", params);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filters: {
      handler(val, oldVal) {
        this.loadProducts();
      },
      deep: true,
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style lang="scss">
.catalog__error {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.catalog__error {
  color: rgb(255, 0, 0);
  .button--primery {
    padding-left: 40px;
    padding-right: 40px;
    &:hover {
      color: black;
    }
  }
}
</style>