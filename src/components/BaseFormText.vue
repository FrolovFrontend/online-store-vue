<template>
  <base-form-field :title="title" :error="error">
    <!-- инпут попадает в то место, куда в компоненте был добавлен слот -->
    <input
      v-model="dataValue"
      class="form__input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
    />
  </base-form-field>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  props: {
    type: {
      default: "text",
    },
    name: {
      default: "",
    },
  },
  mixins: [formFieldMixin],
};
</script>