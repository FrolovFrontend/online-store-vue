<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="product in products" :key="product.id">
      <a class="catalog__pic" href="#">
        <img :src="product.image" :alt="product.title" />
      </a>
      <h3 class="catalog__title">
        <a href="#">{{ product.title }}</a>
      </h3>
      <span class="catalog__price">{{ product.price }} ₽</span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="color in product.colors" :key="color.id">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" />
            <span class="colors__value" :style="{ backgroundColor: color.value }"></span>
          </label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    products: Array,
  },
};
</script>

<style lang="scss">
  .colors__value {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
</style>
