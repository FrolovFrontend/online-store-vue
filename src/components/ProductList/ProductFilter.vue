<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <!-- Цена -->
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom" />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo" />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <!-- Категория -->
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <!-- Цвет -->
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                v-model.number="currentColorId"
                :value="color.id"
              />
              <span class="colors__value" :style="{ backgroundColor: color.value }"></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <!-- Объем памяти -->
      <fieldset class="form__block">
        <legend class="form__legend">Объем памяти</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="memory in memories" :key="memory.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                v-model="currentMemoryId"
                :value="memory.id"
              />
              <span class="check-list__desc">
                {{ memory.value }}
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >Сбросить</button>
    </form>
  </aside>
</template>

<script>
import categories from "../../data/categories";
import products from "../../data/products";

export default {
  data() {
    return {
      // фильтруем через состояние по кнопке "применить"
      // с помощью метода submit
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      currentMemoryId: 0,
    };
  },
  props: {
    priceFrom: Number,
    priceTo: Number,
    categoryId: Number,
    colorId: Number,
    memoryId: Number,
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
    memoryId(value) {
      this.currentMemoryId = value;
    },
  },
  methods: {
    submit() {
      // говорим, что обновилось состояние priceFrom
      // и в качестве нового значения передаем currentPriceFrom
      // (который привязан к инпутам через v-model) и так для всех
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:colorId", this.currentColorId);
      this.$emit("update:memoryId", this.currentMemoryId);
    },
    reset() {
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:colorId", 0);
      this.$emit("update:memoryId", 0);
    },
  },
  computed: {
    // Если бы нужно было фильтровать на лету
    // currentPriceFrom: {
    //   get() {
    //     return this.priceFrom
    //   },
    //   set(value) {
    //     this.$emit('update:priceFrom', value);
    //   }
    // },
    categories() {
      return categories;
    },
    colors() {
      const colors = products
        .filter((product) => product.colors)
        .map((x) => x.colors)
        .flat();
      const result = [];

      for (let i = 0; i < colors.length; i++) {
        const indexes = result.map((item) => item.id);
        if (!indexes.includes(colors[i].id)) {
          result.push(colors[i]);
        }
      }
      result.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
      return result;
    },
    memories() {
      const memories = products
        .filter((product) => product.memories)
        .map((item) => item.memories)
        .flat();
      const result = [];

      for (let i = 0; i < memories.length; i++) {
        const indexes = result.map((item) => item.id);
        if (!indexes.includes(memories[i].id)) {
          result.push(memories[i]);
        }
      }
      result.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
      return result;
    },
  },
};
</script>
