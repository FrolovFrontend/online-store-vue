<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{ countProducts }} {{ declOfProduct }}</span>
    </div>
    <div class="content__catalog">
      <product-filter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
      />
      <section class="catalog">
        <base-preloader v-if="productsLoading" />
        <div class="catalog__error" v-if="productsLoadingFailed">
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

export default {
  components: { ProductList, BasePagination, ProductFilter, BasePreloader },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 6,

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url,
            };
          })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    declOfProduct() {
      const decl = ["товар", "товара", "товаров"];
      const quantity = this.countProducts;

      return declOfNumber(quantity, decl);
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      // обертка setTimeout для того, чтобы был один запрос на сервер
      // вместо кучи запросов для каждого свойства
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + "/api/products", {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productsLoadingFailed = true))
          .then(() => (this.productsLoading = false));
      }, 500);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
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