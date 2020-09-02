<template>
  <base-form-field :title="title" :error="error">
    <!-- инпут попадает в то место, куда в компоненте был добавлен слот -->
    <input v-model="dataValue" class="form__input" :type="type" :placeholder="placeholder" />
  </base-form-field>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  props: {
    type: {
      default: "text",
    },
  },
  mixins: [formFieldMixin],
};
</script>