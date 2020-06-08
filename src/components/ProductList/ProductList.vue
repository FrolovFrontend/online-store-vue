<template>
  <ul class="catalog__list">
    <ProductItem :product-item="product" v-for="(product, index) in products" :key="index" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem/ProductItem.vue';

export default {
  components: { ProductItem },
  props: {
    products: Array,
  },
};
</script>
