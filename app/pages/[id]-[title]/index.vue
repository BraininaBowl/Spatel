<template>
  <article>
    <h1>{{ recipe.title }}</h1>
    <h3>by {{ recipe.author }}</h3>
    <p>content</p>
  </article>
</template>

<script setup>
const route = useRoute();
const recipeId = route.params.id;
const { recipe, recipes, fetchRecipe, fetchRecipes } = useRecipes();
onMounted(() => {
  fetchRecipes
  fetchRecipe(recipeId);
});
</script>
