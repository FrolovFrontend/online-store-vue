<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <button
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === 1 }"
        :disabled="page === 1"
        aria-label="Предыдущая страница"
        @click.prevent="paginate(page - 1)"
      >
      <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </button>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <button
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }"
        :disabled="page === pages"
        aria-label="Следующая страница"
        @click.prevent="paginate(page + 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: {
    page: Number,
    count: Number,
    perPage: Number,
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>

<style lang="scss">
  button {
    background-color: transparent;
    outline: none;
    cursor: pointer;
    &:hover {
      opacity: .6;
    }
  }
</style>
