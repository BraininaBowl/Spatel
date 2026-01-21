<template>
  <main class="index" v-if="loggedIn">
    <h1>Edit recipe</h1>
    <div class="loading" v-if="!recipe">Loading...</div>
    <FormRecipeComponent :recipe="recipe" v-else />
  </main>
  <main v-else>
    <h1>You shouldn't be here.</h1>
    <p><NuxtLink to="/">Return home</NuxtLink></p>
  </main>
</template>

<script setup>
const route = useRoute();
const recipeId = route.params.id;
const { recipe, fetchRecipe, fetchRecipes } = useRecipes();
const { loggedIn } = useUserSession();

onMounted(() => {
  fetchRecipe(recipeId);
});
</script>

<style lang="css" scoped></style>
