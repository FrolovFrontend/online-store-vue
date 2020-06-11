<template>
  <ul class="catalog__list">
    <product-item
      :product-item="product"
      v-for="product in products"
      :key="product.id"
    />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: {
    products: Array,
  },
};
</script>
