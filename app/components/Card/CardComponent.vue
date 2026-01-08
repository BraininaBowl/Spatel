<template>
  <NuxtLink :to="`/${recipe.id}-${recipe.title}`" class="card">
    <p>{{ recipe.title }} by {{ recipe.author }}</p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="css" scoped></style>
