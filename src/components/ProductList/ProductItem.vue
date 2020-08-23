<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: item.id}}">
      <img :src="item.image" :alt="item.title" />
    </router-link>
    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: item.id}}">{{ item.title }}</router-link>
    </h3>
    <span class="catalog__price">{{ item.price | numberFormat }} ₽</span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in item.colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :name="item.id + item.title"
            :value="color.id"
          />
          <span class="colors__value" :style="{ backgroundColor: color.code }"></span>
        </label>
      </li>
    </ul>

    <ul class="sizes">
      <li class="sizes__item" v-for="memory in item.memories" :key="memory.id">
        <label class="sizes__label">
          <input
            class="sizes__radio sr-only"
            type="radio"
            :name="item.id + item.price"
            :value="memory.id"
            :checked="memory.checked"
          />
          <span class="sizes__value">{{ memory.value }}</span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from "@/helpers/filters/numberFormat";

export default {
  props: ["item"],
  filters: {
    numberFormat,
  },
};
</script>

<style lang="scss">
.colors__value {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.sizes {
  margin-top: 16px;
}
</style>