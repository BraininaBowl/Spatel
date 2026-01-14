<template>
  <div class="loader" v-if="!recipe">Loading...</div>
  <article class="recipe" v-else>
    <header>
      <h1 v-if="recipe.title">{{ recipe.title }}</h1>
      <NuxtLink :to="`/${recipe.id}-${returnUri(recipe.title)}/edit`">Edit</NuxtLink>
    </header>
    <main>
    <section v-if="recipe.description">
      <h4>Description</h4>
      <p>{{ recipe.description }}</p>
    </section>
    <section v-if="recipe.ingredients">
      <h4>Ingredients</h4>
      <ul v-html="stringToList(recipe.ingredients)"></ul>
    </section>
    <section v-if="recipe.instructions">
      <h4>Instructions</h4>
      <ol v-html="stringToList(recipe.instructions)"></ol>
    </section>
    <section v-if="recipe.notes">
      <h4>Notes</h4>
      <p>{{ recipe.notes }}</p>
    </section>
    </main>
  </article>
</template>

<script setup>
import { returnUri } from "~/layouts/default.vue";
const route = useRoute();
const recipeId = route.params.id;
const { recipe, fetchRecipe, fetchRecipes } = useRecipes();
function stringToList(string) {
  const array = string ? string.split("\n") : [];
  const filtered = array.filter((item) => item.trim() !== "");
  return filtered.map((item) => `<li class="recipe-li">${item}</li>`).join("");
}
onMounted(() => {
  fetchRecipe(recipeId);
});
</script>
<style lang="css" scoped>
.recipe, .recipe main {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  section {
    display: flex;
    flex-direction: column;
    gap: 0rem;

    p,
    ol,
    ul {
      border: 1px solid var(--col-border);
      background-color: var(--col-area-bg);
      border-radius: 4px;
      padding: 0.75rem 0.75rem;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    ol, ul {
      padding-left: 2rem;
    }

  }
}
</style>
