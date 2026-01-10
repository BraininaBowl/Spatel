<template>
  <div class="formfield">
    <label :for="id">{{ formfieldData.label }}</label>
    <input
      type="text"
      :id="id"
      :placeholder="formfieldData.placeholder"
      v-model="model"
      :required="formfieldData.required"
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

<style lang="css" scoped>
.formfield {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  width: 100%;
}
</style>
