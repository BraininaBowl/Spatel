<template>
  <NuxtLink
    :to="`/${recipe.id}-${returnUri(recipe.title)}${recipe.trashed ? '/edit' : ''}`"
    class="card"
    :title="recipe.description"
  >
    <h2>
      {{ recipe.title }}
    </h2>
    <p v-if="recipe.description">{{ recipe.description }}</p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
import { returnUri } from "~/layouts/default.vue";
</script>

<style lang="css" scoped>
a.card {
  background-color: var(--col-area-bg);
  border: 1px solid var(--col-border);
  border-radius: 0.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0rem;
  align-items: flex-start;
  transition: all 0.2s ease-out;

h2 {
    flex-grow: 2;
    align-content: center;
    padding: 1rem 1.5rem;
    width: 100%;
    margin: 0;
  }
  p {
    font-size: 0.875rem;
    color: var(--col-text);
    background-color: var(--col-bg);
    width: 100%;
    margin: 0;
    padding: 1rem 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 0;
    border-radius: 0 0 0.5rem 0.5rem;
  }
}

.card:hover {
  border-color: var(--col-link);
  box-shadow:
    0 0.2rem 0.4rem rgba(0, 0, 0, 0.1),
    0 0.4rem 1rem rgba(0, 0, 0, 0.1);
}
</style>
