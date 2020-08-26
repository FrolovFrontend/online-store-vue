<template>
  <div>
    <main-header />
    <router-view />
    <main-footer />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { MainHeader, MainFooter },
  created() {
    const userAccessKey = localStorage.getItem("userAccessKey");
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    // 2. вызываем метод при создании экземпляра
    this.loadCart();
  },
  methods: {
    // 1. получаем action из хранилища
    ...mapActions(["loadCart"]),
    ...mapMutations(["updateUserAccessKey"]),
  },
};
</script>