<template>
  <div class="item__desc">
    <ul class="tabs">
      <li class="tabs__item" v-for="tab in tabs" :key="tab.id">
        <a
          :class="['tabs__link', { 'tabs__link--current': currentTab.name === tab.name }]"
          @click.prevent="currentTab = tab"
        >{{ tab.name }}</a>
      </li>
    </ul>
    <transition name="slide-fade">
      <component :is="currentTab.componentName" />
    </transition>
  </div>
</template>

<script>
import ProductDescription from "./ProductDescription.vue";
import ProductFeature from "./ProductFeature.vue";
import ProductGuarantee from "./ProductGuarantee.vue";
import ProductPayment from "./ProductPayment.vue";

const tabs = [
  {
    id: 1,
    name: "Описание",
    componentName: "product-description",
  },
  {
    id: 2,
    name: "Характеристики",
    componentName: "product-feature",
  },
  {
    id: 3,
    name: "Гарантия",
    componentName: "product-guarantee",
  },
  {
    id: 4,
    name: "Оплата и доставка",
    componentName: "product-payment",
  },
];

export default {
  data() {
    return {
      tabs: tabs,
      currentTab: tabs[0],
    };
  },
  components: {
    ProductDescription,
    ProductFeature,
    ProductGuarantee,
    ProductPayment,
  },
};
</script>

<style>
.tabs__link {
  cursor: pointer;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: none;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>