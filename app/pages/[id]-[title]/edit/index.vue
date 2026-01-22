<template>
  <main class="index" v-if="loggedIn">
    <h1>Edit recipe</h1>
    <div class="loading" v-if="!recipe">Loading...</div>
    <FormRecipeComponent :recipe="recipe" v-else-if="user.id === recipe.author" />
    <CardNotAllowedComponent v-else />
  </main>
  <div v-else>
    <CardNotAllowedComponent />
  </div>
</template>

<script setup>
import CardNotAllowedComponent from '~/components/Card/CardNotAllowedComponent.vue';

const route = useRoute();
const recipeId = route.params.id;
const { recipe, fetchRecipe, fetchRecipes } = useRecipes();
const { loggedIn, user } = useUserSession();
await fetchRecipe(recipeId);
console.log ("user: ", user )
onMounted(() => {
});
</script>

<style lang="css" scoped></style>
