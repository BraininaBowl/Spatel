<template>
  <main class="index">
    <h1>Edit recipe</h1>
    <section v-if="loggedIn">
      <div class="loading" v-if="!recipe">Loading...</div>
      <FormRecipeComponent
        :recipe="recipe"
        v-else-if="user.id === recipe.author"
      />
      <CardNotAllowedComponent v-else />
    </section>
    <section v-else>
      <div class="page_options">
        <div class="submenu left"></div>
        <NavigationOptionsRightComponent />
      </div>
      <CardNotAllowedComponent />
    </section>
  </main>
</template>

<script setup>
import CardNotAllowedComponent from "~/components/Card/CardNotAllowedComponent.vue";

const route = useRoute();
const recipeId = route.params.id;
const { recipe, fetchRecipe, fetchRecipes } = useRecipes();
const { loggedIn, user } = useUserSession();
await fetchRecipe(recipeId);
onMounted(() => {});
</script>

<style lang="css" scoped></style>
