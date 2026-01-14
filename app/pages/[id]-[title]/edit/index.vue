<template>
  <main class="index">
    <h1>Edit recipe</h1>
    <div class="loading" v-if="!recipe">Loading...</div>
    <FormRecipeComponent :recipe="recipe" v-else />
  </main>
</template>

<script setup>
const route = useRoute();
const recipeId = route.params.id;
const { recipe, fetchRecipe, fetchRecipes } = useRecipes();
onMounted(() => {
  fetchRecipe(recipeId);
});
</script>

<style lang="css" scoped></style>
