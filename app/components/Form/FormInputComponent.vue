<template>
  <div :class="`formfield ${formfieldData.typeField}`">
    <label
      class="hidden"
      :for="formfieldData.id"
      v-if="formfieldData.labelHidden === true"
      >{{ formfieldData.label }} <span class="required" v-if="formfieldData.requiredField">*</span></label
    >
    <label :for="formfieldData.id" v-else>{{ formfieldData.label }} <span class="required" v-if="formfieldData.requiredField">*</span></label>
    <input
      :type="formfieldData.typeField"
      :id="formfieldData.id"
      :placeholder="formfieldData.placeholder"
      v-model="model"
      :required="formfieldData.requiredField"
      :disabled="formfieldData.disabledField"
      :autocomplete="formfieldData.autocomplete"
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

<style lang="css" scoped></style>
