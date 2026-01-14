<template>
  <div class="formfield">
    <label
      class="hidden"
      :for="formfieldData.id"
      v-if="formfieldData.labelHidden === true"
      >{{ formfieldData.label }}</label
    >
    <label :for="formfieldData.id" v-else>{{ formfieldData.label }}</label>
    <p v-if="formfieldData.help" class="help-text">{{ formfieldData.help }}</p>
    <textarea
      rows="3"
      :id="formfieldData.id"
      :placeholder="formfieldData.placeholder"
      v-model="model"
      :required="formfieldData.requiredField"
      :disabled="formfieldData.disabledField"
    />
  </div>
</template>

<script setup>
const model = defineModel();
defineProps({
  formfieldData: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="css" scoped>
textarea {
  field-sizing: content;
  width: 100%;
}
</style>
