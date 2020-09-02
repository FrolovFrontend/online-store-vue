<template>
  <base-form-field :title="title" :error="error">
    <textarea v-model="dataValue" class="form__input form__input--area" :placeholder="placeholder"></textarea>
  </base-form-field>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  mixins: [formFieldMixin],
};
</script>