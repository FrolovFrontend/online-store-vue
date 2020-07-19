<template>
  <li class="catalog__item">
      <a class="catalog__pic" href="#">
        <img :src="item.image" :alt="item.title" />
      </a>
      <h3 class="catalog__title">
        <a href="#">{{ item.title }}</a>
      </h3>
      <span class="catalog__price">{{ item.price.toLocaleString('ru-RU') }} ₽</span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="color in item.colors" :key="color.id">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              name="color"
            />
            <span class="colors__value" :style="{ backgroundColor: color.value }"></span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
export default {
  props: ['item'],
};
</script>

<style lang="scss">
  .colors__value {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
</style>