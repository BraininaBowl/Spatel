<template>
  <div class="formfield">
    <label
      class="hidden"
      :for="id"
      v-if="formfieldData.labelHidden === true"
      >{{ formfieldData.label }}</label
    >
    <label :for="id" v-else>{{ formfieldData.label }}</label>
    <input
      type="text"
      :id="id"
      :placeholder="formfieldData.placeholder"
      v-model="model"
      :required="formfieldData.requiredField"
    />
  </div>
</template>

<script setup>
const model = defineModel();
const id = useId();
defineProps({
  formfieldData: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="css" scoped></style>
