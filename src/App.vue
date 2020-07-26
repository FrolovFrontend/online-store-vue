<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{ countProducts }} товара</span>
    </div>
    <div class="content__catalog">
      <product-filter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
        :memory-id.sync="filterMemoryId"
      />

      <section class="catalog">
        <product-list :products="products" />

        <base-pagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import products from "./data/products";
import ProductList from "./components/ProductList/ProductList.vue";
import BasePagination from "./components/BasePagination.vue";
import ProductFilter from "./components/ProductList/ProductFilter.vue";

export default {
  name: "App",
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      filterMemoryId: [],

      page: 1,
      productsPerPage: 6,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom
        );
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo
        );
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId
        );
      }

      if (this.filterColorId > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          if (!product.colors) return false;
          const ids = product.colors.map((item) => item.id);
          return ids.includes(this.filterColorId);
        });
      }

      if (this.filterMemoryId.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          if (!product.memories) return false;
          const ids = product.memories.map((item) => item.id);
          return ids.includes(this.filterMemoryId.indexOf());
        });
      }

      // if (this.filterColorId > 0) {
      //   filteredProducts = filteredProducts.filter(product =>
      //     product.colors.some(item => item.id === this.filterColorId)
      //   );
      // }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
