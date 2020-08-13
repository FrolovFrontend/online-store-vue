<template>
  <ul class="catalog__list">
    <product-item
      :item="product"
      v-for="product in products"
      :key="product.id"
      @goto-page="(pageName, pageParams) => $emit('goto-page', pageName, pageParams)"
    />
  </ul>
</template>

<script>
import ProductItem from "./ProductItem.vue";

export default {
  components: { ProductItem },
  props: {
    products: Array,
  },
};
</script>
