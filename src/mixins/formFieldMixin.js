import BaseFormField from "@/components/BaseFormField.vue";

export default {
  props: {
    title: String,
    error: String,
    placeholder: String,
  },
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
