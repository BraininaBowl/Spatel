<template>
  <div class="loader" v-if="!recipe">Loading...</div>
  <article v-else>
    <h1>{{ recipe.title }}</h1>
    <h3>by {{ recipe.author }}</h3>
    <p>content</p>
  </article>
</template>

<script setup>
const route = useRoute();
const recipeId = route.params.id;
const { recipe,fetchRecipe, fetchRecipes } = useRecipes();
onMounted(() => {
  fetchRecipe(recipeId);
});
</script>
